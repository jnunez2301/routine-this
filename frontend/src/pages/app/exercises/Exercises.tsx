import { BodyPartEnum } from "../../../model/Exercise";
import { Link } from "@tanstack/react-router";

function getBodyPartImage(bodyPart: string) {
  return `/body_parts/${bodyPart.toLocaleLowerCase()}.png`;
}

function getBodyPartsParsed() {
  return Object.values(BodyPartEnum).map((e) => {
    return e
      .replace("_", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
}

const Exercises = () => {
  return (
    <div id="exercise-list" className="flex gap-2 flex-wrap p-2">
      {getBodyPartsParsed().map((bodyPart) => (
        <Link
          className="flex flex-col items-center justify-center font-semibold hover:opacity-50 transition-all"
          to={`/app/exercises/${bodyPart.toLocaleLowerCase()}`}
          key={bodyPart}
        >
          <header className="text-white bg-purple-800 w-full text-center">
            <h2>{bodyPart}</h2>
          </header>
          <img
            className="w-30 h-30 border rounded-sm"
            src={getBodyPartImage(bodyPart)}
            alt={`Image of ${bodyPart} muscle`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/logo_b.png";
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default Exercises;
