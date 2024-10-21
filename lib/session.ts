import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

interface Payload {
  userId: string;
  expires: Date;
}

interface Session {
  userId: string;
  expires: number; // JWT times are usually represented as Unix timestamps
}

const cookie = {
  name: "session",
  duration: 60 * 60 * 24 * 7 * 1000, // 7 days
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
};

export const encrypt = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setAudience("urn:example:audience")
    .setExpirationTime("7days")
    .sign(secretKey);
};

export const decrypt = async (session) => {
  try {
    const { payload } = await jwtVerify(session, secretKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    // console.log("Failed to verify session token:", error);
  }
};

export const createSession = async (userId: string) => {
  const expires = new Date(Date.now() + cookie.duration); // Ensure duration is in milliseconds
  const session = await encrypt({ userId, expires });
  // console.log("Generated Session:", session); // Debugging line

  cookies().set(cookie.name, session, {
    ...cookie.options,
    expires: expires,
    sameSite: cookie.options.sameSite as "lax",
  });

  return true;
};

export const verifySession = async () => {
  try {
    const sessCookie = cookies().get(cookie.name)?.value;
    // console.log("Session Cookie:", sessCookie); // Debugging line

    if (!sessCookie) {
      // console.log("Session cookie is missing.");
      return null;
    }

    const session = await decrypt(sessCookie);
    console.log("Decrypted Session:", session); // Debugging line

    if (!session || !session.userId) {
      // console.log("Session is invalid or userId is missing.");
      return null;
    }

    return { userId: session.userId };
  } catch (error) {
    // console.error("Failed to verify session:", error);
    return null;
  }
};


export const deleteSession = async () => {
  cookies().delete(cookie.name);
  redirect("/login");
};
