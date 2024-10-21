import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { getWallets } from "@/lib/appwrite/api";
import { WalletInfo } from "@/helpers/interface";
import Lottie from "lottie-react";
import Loader from "../../assets/Loader.json";
import { formatDateString } from "@/helpers/formatDate";
import { toast } from "sonner";

const AdminWalletCards = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchWallets = async () => {
      try {
        const wallets = await getWallets();
        console.log(wallets);
        if (wallets) {
          setWallets(wallets);
        }
      } catch (error) {
        console.error("Error fetching wallets:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallets();
  }, []);

  return (
    <>
      {!isLoading ? (
        wallets.length > 0 ? (
          <div className="flex flex-col gap-2">
            {wallets.map(({ $id, imageUrl, cryptoCurrency, walletAddress, $createdAt }) => (
              <Card key={$id} className="py-2 px-5">
                <CardContent className="tracking-wider space-y-2 p-0 space-x-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <img
                        width={45}
                        src={imageUrl}
                        alt="a crypto asset image"
                      />
                      <span className="text-lg font-medium capitalize">
                        {cryptoCurrency}
                      </span>
                    </span>
                    <span className="font-light">
                      <span className="font-medium">Address: </span>
                      {walletAddress}
                    </span>
                  </div>
                  <p className="flex items-center justify-end">
                    {formatDateString($createdAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="tracking-wide font-medium">No wallets to display</p>
        )
      ) : (
        <div className="w-1/2 mt-20 mx-auto">
          <p className="font-light text-center tracking-widest">Wallets loading</p>
          <Lottie className="w-32 mx-auto" animationData={Loader} />
        </div>
      )}
    </>
  );
};

export default AdminWalletCards;
