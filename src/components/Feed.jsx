import React from "react";
import Post from "./Post";

const postsData = [
  {
    id: 1,
    username: "croche.teka",
    avatar: "/post-imagem.jpg",
    time: "2 sem",
    location: "Santa Catarina",
    images: ["/post1_1.jpg", "/post1_2.jpg", "/post1_3.jpg"],
    likes: 11900,
    liked: false,
    caption:
      "Gatinho smilinguido siamês! O primeiro por aqui com os olhos azuis e orelhas compridas! Inspiracao @holly_makes_things #arte #gato #smilinguido #croche #cute",
    comments: [
      { user: "neko.ghibli", text: "Que fofura!! 😭" },
      { user: "luna.rockwell", text: "Preciso de um desse na minha vida" },
      { user: "aiko.moon", text: "Os olhinhos azuis sao tudo!!" },
    ],
  },
  {
    id: 2,
    username: "baka.y0l",
    avatar: "/avatar_baka.jpg",
    time: "3 d",
    location: "Metro Rio De Janeiro",
    images: ["/post2_1.jpg"],
    likes: 5900,
    liked: false,
    caption: "Cabelo novo e metro do Rio com a mais mais",
    comments: [
      { user: "luna.rockwell", text: "Arrasando demais!" },
      { user: "aiko.moon", text: "Que foto incrivel!" },
    ],
  },
  {
    id: 3,
    username: "ghiblibrasil",
    avatar: "/avatar_ghibli.jpg",
    time: "12 sem",
    images: ["/post3_1.jpg"],
    likes: 5573,
    liked: false,
    caption:
      "Prepare o coracao: o Studio Ghibli voltara as telonas em breve! O Ghibli Fest retorna em 2026 com 14 filmes, incluindo 7 titulos ineditos nao exibidos na primeira etapa. Ingressos ja disponiveis. 19 de fevereiro a 4 de marco. #StudioGhibli #GhibliLovers #Anime #GhibliFest2026 #GhibliBrasil",
    comments: [
      { user: "aiko.moon", text: "Ja comprei meu ingresso!!" },
      { user: "neko.ghibli", text: "Finalmente voltando aos cinemas" },
    ],
  },
  {
    id: 4,
    username: "theofficeptbr",
    avatar: "/avatar_office.jpg",
    time: "34 sem",
    images: ["/post4_1.jpg", "/post4_2.jpg"],
    likes: 2198,
    liked: false,
    caption:
      "Alguem consegue explicar? Existe a possibilidade de chegar no Brasil pela HBOMax, porem nada concreto foi divulgado, e a serie estreiou ontem nos EUA. #thepaper #theoffice #streaming #hbomax #primevideo #serie",
    comments: [
      { user: "profthiagopestana", text: "Simples. A serie e aem graca." },
      {
        user: "adrianvidal__",
        text: "se tu precisa citar The Office pra explicar a importancia da nova serie, entao tu ja tem tua resposta",
      },
      {
        user: "mariaedcustodia",
        text: "So de ter o Oscar de novo ja vale a pena assistir, vou ver mesmo no pelo sem legenda",
      },
    ],
  },
  {
    id: 5,
    username: "simonscatofficial",
    avatar: "/avatar_simonscat.jpg",
    time: "4 d",
    images: ["/post5_1.jpg"],
    likes: 10800,
    liked: false,
    caption: "Monty approves this drawing ....Happy #caturday",
    comments: [
      { user: "viviansantana425", text: "Lindooooo!!! 🩷🩷🩷🩷🩷🩷🩷" },
      { user: "hylton991", text: "So cute" },
      { user: "yoguicindy", text: "🤩🤩🤩Aawwww" },
      {
        user: "okularowa",
        text: "The best approver in the world! Happy Caturday and have a wonderful weekend, lovely Monty 🌻🌸🌷🌿🥰😍🩷🩷🩷",
      },
    ],
  },
  {
    id: 6,
    username: "prefeituradesuzano",
    avatar: "/avatar_suzano.jpg",
    time: "6 h",
    images: ["/post6_1.jpg"],
    likes: 723,
    liked: false,
    caption:
      "VEM AI - ROCK NO PARQUE! Reserve essa data na agenda, porque vem coisa boa por ai! No dia 17 de maio, das 13 as 18 horas, o Parque Max Feffer vai ser palco de uma tarde cheia de energia e muito rock. Bandas convidadas: Envene, Soldiers - Linkin Park Tribute, Deftones Tribute Brazil, Daos - System of a Down Cover. Entrada gratuita! Local: Pavilhao Zumbi dos Palmares, Parque Max Feffer (Av. Senador Roberto Simonsen, 90)",
    comments: [
      {
        user: "_aryelmartins",
        text: "Que evento incrivel! Vou levar a galera",
      },
      { user: "luna.rockwell", text: "Linkin Park Tribute?? JA TO LA" },
      {
        user: "jim.catper",
        text: "Entrada gratuita e ainda Deftones? Perfeito",
      },
    ],
  },
];

export default function Feed() {
  return (
    <div className="feed">
      {postsData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
