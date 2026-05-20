
import "./globals.css";

export const metadata = {
  title:"People Platform Cloud"
};

export default function RootLayout({children}){
  return(
    <html>
      <body>{children}</body>
    </html>
  )
}
