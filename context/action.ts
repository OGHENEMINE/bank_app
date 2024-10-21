"use server";

import { deleteSession } from "@/lib/session";

export const getLoggedOut = async () => {
try {
    await deleteSession()
} catch (error) {
    throw error;
}
}