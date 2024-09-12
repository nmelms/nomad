import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

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
      className="h-[300px] w-screen absolute bottom-[-265px] rounded-lg bg-white items-center text-black flex flex-col "
    >
      <div className="w-full flex justify-center">
        <FontAwesomeIcon icon={faCaretUp} />
      </div>
      <div className="button-wrapper w-full h-full pt-10 max-w-[450px]">
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretUp} />
      </div>
    </div>
  );
};

export default SideUpMenu;
