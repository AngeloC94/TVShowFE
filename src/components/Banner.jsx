import React from "react";
import TheLastOfUsSection from "../img/thelastofusSection.jpg";

export default function Banner() {
  return (
    <div className="thelastofusSectionWrapper">
      <div className="thelastofusSectionContainer">
        <div className="thelastofusSectionImg">
        <img  src={TheLastOfUsSection} />
        </div>

      <div className="thelastofusDescriptionContainer">
        <p>
          "The Last of Us" is an upcoming television series based on the popular
          video game of the same name. The series is being produced by HBO and
          is set to star Pedro Pascal and Bella Ramsey as the two main
          characters, Joel and Ellie. The show is being developed by Craig
          Mazin, the creator of the critically acclaimed series "Chernobyl", and
          the game's creative director, Neil Druckmann. The series will follow
          the same story as the video game, which takes place in a
          post-apocalyptic world where a fungal infection has turned most of
          humanity into zombies. Joel, a smuggler, is tasked with escorting
          Ellie, a teenage girl who is immune to the infection, across the
          country to a resistance group known as the Fireflies. Along the way,
          they face numerous challenges and dangers, including other survivors
          and the infected. Fans of the game are eagerly anticipating the
          series, which promises to bring the intense and emotional story of the
          game to the small screen. With an experienced creative team and
          talented actors, "The Last of Us" series is shaping up to be one of
          the most highly anticipated television events of the year.
        </p>
      </div>
      </div>
    </div>
  );
}
