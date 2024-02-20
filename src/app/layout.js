import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/themeprovider/theme-provider";
import Navbar from "@/components/home/navbar/navbar";
import Footer from "@/components/home/footer/footer";
import AuthProvider from "@/components/authprovider/auth-provider";
import QueryProvider from "@/components/queryprovider/query-provider";
import Main from "@/components/home/main";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Marketplace",
  description: "This is online marketplace platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              <Main children={children} />
              <Footer />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
