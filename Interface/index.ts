import Register from "@/app/(auth)/register/page";

export interface UserInterface {
  id: String;
  firstname: String;
  lastname: String;
  pin: String;
  email: String;
  registered: String;
  role: String;
  otp?: String;
  otpExpiresAt?: String;
}

export interface AuthContextInterface {
  user: UserInterface;
  setUser: (user: UserInterface) => void;
  isAuthenticated: boolean;
  checkUser: () => void;
  handleLogOut: () => void;
  isLoading: boolean;
}

export interface AccountInterface {
  id: string;
  accountName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  userId: string;
  createdAt: string;
  ownerName?: string;
}

// export interface accountInfo {
//   $id: string;
//   accountName: string;
//   ownerFirstName?: string;
//   ownerLastName?: string;
//   ownerId?: string;
//   accountNumber: string;
//   accountType: string;
//   balance: string;
//   currency: string;
//   $createdAt: string;
//   transactions?: transactionInfo[];
// }

export interface TransactionInterface {
  id: string;
  accountId: string;
  transactionTitle: string;
  hiddenStatus: string;
  accountName?: string;
  transactionCurrency: string;
  transactionType: string;
  transactionReceiverBank: string;
  transactionReceiverName: string;
  transactionDesc: string;
  amount: number;
  transactionStatus: string;
  createdAt: string;
}

// Interface for the form details
export interface TransferFormDetails {
  account: string;
  amount: string;
  transactionDescription: string;
  receiverBank: string;
  transactionReceiver: string;
  senderAccountId: string;
}

// Interface for the form context
export interface TransferFormInterface {
  handleGoBack: () => void;
  isLoading: boolean;
  accounts: AccountInterface[];
  formDetails?: TransferFormDetails;
  setFormDetails: (formDetails: TransferFormDetails) => void;
  step: number;
  setStep: (step: number) => void;
  handleToggle: () => void;
}

export interface DepositDetails {
  accountId: string;
  amount: number;
  wallet: string;
}

export interface DepositInterface {
  handleGoBack: () => void;
  formDetails?: DepositDetails;
  setFormDetails: (formDetails: DepositDetails) => void;
  step: number;
  setStep: (step: number) => void;
}

export interface SideBarContext {
  expanded: boolean;
}

export interface CustomerTransaction {
  $id: string;
  name: string;
  amount: string;
  type: string;
  date: string;
}
export interface CryptoAsset {
  id: string;
  symbol: string;
  address: string;
  name: string;
  image: string;
  price: number;
  createdAt: string;
}

export interface WalletInfo {
  $id: string;
  imageUrl: string;
  cryptoCurrency: string;
  walletAddress: string;
  $createdAt: string;
}
export interface NewWalletInfo {
  cryptoCurrency: string;
  imageUrl: string;
  walletAddress: string;
}

export interface TokenInfo {
  id: string;
  token: string;
  username: string;
  usage: string;
  createdAt: string;
}

export interface ToggleContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}
