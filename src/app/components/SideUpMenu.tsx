import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

interface SideUpMenuProps {
  handleAddLocation: () => void;
}
const SideUpMenu: React.FC<SideUpMenuProps> = ({ handleAddLocation }) => {
  let slideMenu: HTMLElement | null;
  useEffect(() => {
    slideMenu = document.getElementById("slide-menu");
  }, []);

  // TODO: switching this to only with with a small hitbox. Eventually change to a slide up the is draggable
  const handleSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (slideMenu) {
      if (slideMenu.classList.contains("slide-up")) {
        slideMenu.classList.remove("slide-up");
        slideMenu.classList.add("slide-down");
      } else {
        slideMenu.classList.add("slide-up");
        slideMenu.classList.remove("slide-down");
      }
    }
  };

  return (
    <div
      id="slide-menu"
      className="h-[300px] w-screen absolute bottom-[-265px] rounded-lg bg-white items-center text-black flex flex-col z-20 "
    >
      <div
        onClick={(e) => handleSlideClick(e)}
        className="w-full flex justify-center"
      >
        <FontAwesomeIcon icon={faCaretUp} />
      </div>
      <div className="button-wrapper w-full h-full pt-10 max-w-[450px]">
        <div className="border-2 rounded-full p-5 ">
          <FontAwesomeIcon size="xl" icon={faUser} />
        </div>
        <FontAwesomeIcon onClick={handleAddLocation} icon={faPlus} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
      </div>
    </div>
  );
};

export default SideUpMenu;
