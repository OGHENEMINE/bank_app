"use client";
import { Button } from "@/components/ui/button";
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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, CopyCheck, HandCoins, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import Image from "next/image";
import QrCodeComponent from "@/components/me/QrCodeComponent";
import { AuthContext } from "@/context/authContext";
import {
  AccountInterface,
  AuthContextInterface,
  CryptoAsset,
  DepositInterface,
} from "@/Interface";
import { depositSchema } from "../schema";
import { createDeposit, getDepositData } from "../action";
import { DepositContext } from "../DepositComponent";

const MakeDeposit = () => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const { setFormDetails, setStep, step } = useContext(
    DepositContext
  ) as DepositInterface;
  const [wallets, setWallets] = useState<CryptoAsset[]>();
  const [accounts, setAccounts] = useState<AccountInterface[]>();
  const [selectedWallet, setSelectedWallet] = useState<CryptoAsset>();
  const [copied, setCopied] = useState(false);
  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 0,
      wallet: "",
      accountId: "",
    },
  });

  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        const { success, message, wallets, accounts } = await getDepositData(
          user.id as string
        );

        if (success) {
          console.log(message);
          setWallets(wallets);
          setAccounts(accounts);
        } else {
          toast.error(message);
          setWallets([]);
        }
      } catch (error) {
        console.error("Error fetching deposit data:", error);
      }
    };
    fetchDepositData();
  }, [user.id]);

  const walletId = form.watch("wallet");
  useEffect(() => {
    const getSelectedWallet = () => {
      if (walletId) {
        const selectedWallet = wallets?.filter(
          (wallet) => wallet.id === walletId
        );
        // console.log("selected wallet", selectedWallet[0])
        if (selectedWallet) {
          setSelectedWallet(selectedWallet[0]);
        } else {
          return console.error("Wallet not selected");
        }
      } else {
        setSelectedWallet({
          id: "",
          symbol: "",
          address: "",
          name: "",
          image: "",
          price: 0,
          createdAt: "",
        });
      }
    };
    getSelectedWallet();
  }, [walletId, wallets]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const onSubmit = async (values: z.infer<typeof depositSchema>) => {
    try {
      console.log(values);
      setStep(step + 1);
      return setFormDetails({
        accountId: values.accountId,
        wallet: values.wallet,
        amount: values.amount,
      });
    } catch (error) {
      console.log("Failed to submit", error);
    }
  };

  return (
    <section className="m-2.5 h-full flex items-center justify-center">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider">Amount</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider">Deposit to</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Accounts</SelectLabel>
                          {accounts &&
                            accounts.map(
                              ({ id, accountName, accountNumber }) => (
                                <SelectItem
                                  className="capitalize tracking-wide"
                                  value={id as string}
                                  key={id as string}
                                >
                                  {accountName} - {accountNumber}
                                </SelectItem>
                              )
                            )}
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
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider">Wallet</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a wallet" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectGroup>
                          <SelectLabel>System Wallets</SelectLabel>
                          {wallets &&
                            wallets.map(({ id, name, image }) => (
                              <SelectItem value={id} key={id}>
                                <div className="flex items-center gap-2">
                                  <Image
                                    height={30}
                                    alt="crypto asset icon"
                                    width={30}
                                    src={image}
                                  />
                                  <span className="font-medium capitalize tracking-wider">
                                    {name}
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
            {selectedWallet?.address && (
              <div className="flex items-center justify-center shadow tracking-wider gap-10  bg-purple-300/20 p-5 rounded">
                <div className="text-sm capitalize gap-1 flex flex-col items-center justify-center">
                  <p>scan QR code</p>
                  <QrCodeComponent data={selectedWallet?.address} />
                </div>
                <p className="font-bold">OR</p>
                <div className="space-y-2">
                  <p className="text-sm">Copy wallet address</p>
                  <p
                    onClick={() => handleCopy(selectedWallet.address)}
                    className={`cursor-pointer rounded bg-white p-2 flex items-center gap-1 justify-center ${
                      copied ? "text-green-700" : ""
                    }`}
                  >
                    <span>{selectedWallet.address}</span>{" "}
                    {copied ? <CopyCheck size={18} /> : <Copy size={18} />}
                  </p>
                </div>
              </div>
            )}
            <Button className="w-full tracking-widest" type="submit">
              {form.formState.isSubmitting ? (
                <p className="flex items-center">
                  <Loader2 size={15} className="text-white animate-spin" />
                  Making deposit...
                </p>
              ) : (
                <span className="flex items-center gap-1">
                  Make deposit
                  <HandCoins size={18} />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default MakeDeposit;
