import Image from "next/image";
import React from "react";

function ShowMedia({
  mediaLink,
  mediaType,
}: {
  mediaLink: string;
  mediaType: string;
}) {
  function convertYouTubeUrl(url: string) {
    let videoId = url.split("https://youtu.be/")[1];
    return "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
  }

  

  if (mediaType === ".jpeg") {
    return <Image alt="Enchente" src={mediaLink} width={500} height={500} />;
  }

  if (mediaType === ".mp4") {
    return (
      <video width="320" height="240" controls>
        <source src={mediaLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (mediaType === "unknown") {
    return (
      <iframe
        width="800"
        height="450"
        src={convertYouTubeUrl(mediaLink)}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    );
  }

  return <div>Media type not supported</div>;
}

export default ShowMedia;
