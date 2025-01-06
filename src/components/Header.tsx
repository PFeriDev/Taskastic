import Image from "next/image";
import ModeToggle from "./ModeToggle";

const Header = () => {
  return (
    <div className="w-full bg-background  border-b border-[#383838]/50">
      <div className="lg:w-4/5 flex justify-between p-5 mx-auto items-center">
        <Image src="/Tasktastic..png" width={150} height={150} alt="logo" className="hidden dark:block"></Image>
        <Image src="/Tasktastic.dark.png" width={150} height={150} alt="logo" className="dark:hidden"></Image>
        <div className="flex items-center gap-5">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
