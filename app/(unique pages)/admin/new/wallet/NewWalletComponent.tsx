"use client";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { symbol, z } from "zod";
import { useRouter } from "next/navigation";
import { WalletValidation } from "./schema";
import { useEffect, useState } from "react";
import Image from "next/image";
import { addAWallet, getCryptoAssets } from "./action";
import { CryptoAsset } from "@/Interface";

const NewWalletComponent = () => {
  const { push } = useRouter();
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        setIsLoading(true);
        const { data, success, message } = await getCryptoAssets();
        // console.log("data:", data);
        if (success) {
          setCryptoAssets(data);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Error fetching crypto assets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoAssets();
  }, []);

  const form = useForm<z.infer<typeof WalletValidation>>({
    resolver: zodResolver(WalletValidation),
    defaultValues: {
      crypto_asset: "",
      wallet_address: "",
      image: "",
      symbol: "",
      price: 0,
    },
  });

  // Watch the specific crypto_asset field
  const cryptoAssetId = form.watch("crypto_asset");

  console.log(cryptoAssets);
  useEffect(() => {
    // console.log(cryptoAssetId);

    const choosenAsset = cryptoAssets.find(
      (asset) => {
        console.log(asset.name, cryptoAssetId);
        return asset.name.toLocaleLowerCase() === cryptoAssetId?.toLocaleLowerCase()
      }
        
    );

    // console.log("crypto asset:", choosenAsset);

    if (choosenAsset) {
      form.setValue("image", choosenAsset.image);
      form.setValue("symbol", choosenAsset.symbol);
      form.setValue("price", Number(choosenAsset.price));
    }
  }, [cryptoAssetId, cryptoAssets, form]);

  const onSubmit = async (values: z.infer<typeof WalletValidation>) => {
    try {
      console.log(values);
      const data = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }

      // Submit the form data...
      const { success, message, error } = await addAWallet(data);
      if (success) {
        toast.success(message);
        push("/wallets");
      } else {
        toast.error(message);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const BreadCrumbItems = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/wallets",
      text: "Back",
    },
  ];

  return (
    <div className="bg-[#f7f7f7] min-h-screen p-5 space-y-8">
      <BreadcrumbComponent items={BreadCrumbItems} currentPage="New Wallet" />
      <Card className="md:w-[80%] mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Add Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {cryptoAssetId && (
                <div className="flex items-center justify-center">
                  <Image
                    src={form.watch("image") || "/image"}
                    width={60}
                    height={60}
                    alt="crypto asset image"
                  />
                </div>
              )}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider hidden">
                        Crypto Image
                      </FormLabel>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider hidden">
                        Crypto Price
                      </FormLabel>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider hidden">
                        Crypto symbol
                      </FormLabel>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="crypto_asset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Crypto Asset
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a crypto asset" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectGroup>
                              <SelectLabel>Crypto Asset</SelectLabel>
                              {cryptoAssets.map((asset) => (
                                <SelectItem
                                  className="block"
                                  key={asset.id}
                                  value={asset.name}
                                >
                                  <div className="flex items-center tracking-wider gap-5">
                                    <Image
                                      height={30}
                                      width={30}
                                      src={asset.image}
                                      alt="crypto asset image"
                                    />
                                    <span className="font-medium">
                                      {asset.name}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wallet_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter wallet address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full tracking-widest" type="submit">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center gap-1">
                    <Loader2 size={15} className="text-white animate-spin" />
                    Adding Wallet...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Add Wallet
                    <FolderPlus size={20} />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewWalletComponent;
