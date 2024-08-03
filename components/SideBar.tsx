import { useUserStore } from "@/zustand/userStore";

export default function SideBar() {
  const user = useUserStore((state) => state.userInfo);

  return (
    <div>
      <p>사이드바</p>
      <h2>{user.email}</h2>
      <h2>{user.name}</h2>
    </div>
  );
}
