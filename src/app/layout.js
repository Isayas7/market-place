import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/themeprovider/theme-provider";
import Navbar from "@/components/home/navbar/navbar";
import Footer from "@/components/home/footer/footer";
import AuthProvider from "@/components/authprovider/auth-provider";
import QueryProvider from "@/components/queryprovider/query-provider";
import Main from "@/components/home/main";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { Toaster } from "@/components/ui/toaster";
import SocketProvider from "@/components/socketprovider/socket-provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "200" });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Marketplace",
  description: "This is online marketplace platform",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  const socketurl = "ws://marketplace-socket.vercel.app/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} min-h-screen overflow-y-scroll`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider session={session}>
              <SocketProvider url={socketurl}>
                <Navbar />
                <Main>{children}</Main>
                <Toaster />
                <Footer />
              </SocketProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
