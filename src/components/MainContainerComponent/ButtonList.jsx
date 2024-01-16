import Button from "./Button";

const ButtonList = () => {
  return (
    <div className="flex">
      <Button name="All" />
      <Button name="Javascript" />
      <Button name="Mixes" />
      <Button name="Music" />
    </div>
  );
};

export default ButtonList;
