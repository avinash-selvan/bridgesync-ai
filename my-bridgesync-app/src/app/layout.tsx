import Navigation from "@/components/Navigation";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}