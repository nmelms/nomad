const SideUpMenu = () => {
  const handleSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains("slide-up")) {
      e.currentTarget.classList.remove("slide-up");
      e.currentTarget.classList.add("slide-down");
    } else {
      e.currentTarget.classList.add("slide-up");
      e.currentTarget.classList.remove("slide-down");
    }
  };

  return (
    <div
      onClick={(e) => handleSlideClick(e)}
      className="h-[300px] w-full absolute bottom-[-250px] rounded-lg bg-white flex justify-center"
    >
      <div className="text-black">^</div>
    </div>
  );
};

export default SideUpMenu;
