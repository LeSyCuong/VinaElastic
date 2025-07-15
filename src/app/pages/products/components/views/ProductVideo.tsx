"use client";

export default function ProductVideo({
  title,
  youtubeId,
}: {
  title: string;
  youtubeId: string;
}) {
  return (
    <div>
      <h2 className="text-3xl mb-5 font-semibold">Thông tin chi tiết</h2>
      <p className="text-3xl mb-4">{title}</p>
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg transition duration-500 hover:scale-[1.01]">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube Video"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
