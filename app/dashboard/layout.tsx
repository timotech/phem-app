import SideNav from "./components/SideNav";
import Header from "./components/Header";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

type UserType = {
  name: string;
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: UserType | null = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET as string) as UserType;
    } catch (err) {
      console.log("Invalid or expired token", err);
    }
  }

  if (!user) {
    console.log("User not authenticated, redirecting to login");
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* SideNav hidden on small screens (mobile) to avoid duplicate menu with header mobile panel */}
      <div className="hidden sm:block sm:flex-none sm:w-64 md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-4">
        <Header user={user.name} />
        {children}
      </div>
    </div>
  );
}
