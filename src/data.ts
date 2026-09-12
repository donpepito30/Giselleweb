import type { UserProfile, Video } from './types';

export const USER_PROFILE: UserProfile = {
  name: 'Gisela',
  handle: '@gisela08.07',
  bio: 'Creadora de contenido, apasionada por la moda, el bienestar y los momentos auténticos ✨\nAmante de la luz natural, los buenos looks y conectar con ustedes desde el corazón. Aquí comparto mi día a día, mis outfits preferidos y mis proyectos audiovisuales favoritos. ¡Gracias por acompañarme en este camino! 🤍',
  avatarUrl: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107671455.mp4',
  followers: '128K',
  following: '240',
  likes: '840K',
};

// Natural community avatars
const av1 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
const av2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80';
const av3 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80';
const av4 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80';
const av5 = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80';

export const VIDEOS: Video[] = [
  {
    id: 'vid_1',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/reel.mp4',
    baseLikes: 9420,
    baseComments: 138,
    baseShares: 52,
    description: 'Vibras de fin de semana y momentos únicos ✨ Capturando instantes espontáneos que me llenan de alegría. Me encanta compartir esta energía con ustedes 🤍',
    commentsList: [
      { id: 'c_r1', user: 'valeria.m', avatar: av3, text: 'Qué energía tan bonita transmites en este reel ✨', time: '10m' },
      { id: 'c_r2', user: 'marcos_g', avatar: av2, text: 'Siempre impecable, qué estilazo!', time: '45m' },
      { id: 'c_r3', user: 'claudia.fit', avatar: av5, text: 'Amo este video, tu vibra es lo máximo 💕', time: '2h' },
    ]
  },
  {
    id: 'vid_2',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/si.mp4',
    baseLikes: 8750,
    baseComments: 112,
    baseShares: 44,
    description: 'Diciéndole que sí a los nuevos comienzos y a todo lo bueno que viene 💫 Siempre confiando en el proceso y disfrutando cada paso del camino.',
    commentsList: [
      { id: 'c_s1', user: 'camila.v', avatar: av1, text: 'Totalmente de acuerdo, esa actitud positiva lo es todo 🙌', time: '15m' },
      { id: 'c_s2', user: 'daniel.r', avatar: av4, text: 'Una sonrisa que lo dice todo ✨', time: '1h' },
      { id: 'c_s3', user: 'sofia_couture', avatar: av3, text: 'Preciosa como siempre Gisela 💖', time: '3h' },
    ]
  },
  {
    id: 'vid_3',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_1774600024749.mp4',
    baseLikes: 6840,
    baseComments: 86,
    baseShares: 33,
    description: 'Un look fresco para disfrutar del día al máximo 🌸 La comodidad y la elegancia siempre pueden ir de la mano cuando te sientes auténtica.',
    commentsList: [
      { id: 'c_t1', user: 'paula.estilo', avatar: av1, text: 'Me fascina este conjunto, súper veraniego y fresco 👌', time: '20m' },
      { id: 'c_t2', user: 'adrian_92', avatar: av2, text: 'Esa naturalidad frente a la cámara es de admirar ✨', time: '50m' },
      { id: 'c_t3', user: 'lucia_b', avatar: av3, text: 'Qué belleza de toma, te queda genial!', time: '2h' },
    ]
  },
  {
    id: 'vid_4',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_1775107538796.mp4',
    baseLikes: 5250,
    baseComments: 74,
    baseShares: 26,
    description: 'Disfrutando de la tarde con una calma increíble ✨ Me siento genial cuando me tomo un momento para respirar hondo y conectar con lo simple. ¿Cómo va su día hoy? 🤍',
    commentsList: [
      { id: 'c1', user: 'valeria.m', avatar: av3, text: 'Qué tranquilidad transmite este video, te ves preciosa!', time: '15m' },
      { id: 'c2', user: 'marcos_g', avatar: av2, text: 'Esa energía positiva se contagia de inmediato ✨', time: '1h' },
      { id: 'c3', user: 'claudia.fit', avatar: av5, text: 'Amé tu cabello y el conjunto, súper fresca!', time: '3h' },
    ]
  },
  {
    id: 'vid_5',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40andreabatres565_1775109224067.mp4',
    baseLikes: 7690,
    baseComments: 105,
    baseShares: 39,
    description: 'Detalles que enamoran y combinaciones favoritas ✨ Me encanta experimentar con diferentes estilos y crear algo especial que refleje mi personalidad.',
    commentsList: [
      { id: 'c_a1', user: 'elena_sky', avatar: av3, text: 'Ese detalle en el outfit marca toda la diferencia 💖', time: '12m' },
      { id: 'c_a2', user: 'felipe_lens', avatar: av4, text: 'Gran composición visual y qué elegancia!', time: '40m' },
      { id: 'c_a3', user: 'mariana.p', avatar: av5, text: 'Guapísima como siempre, inspiras un montón ✨', time: '1h' },
    ]
  },
  {
    id: 'vid_6',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107343109.mp4',
    baseLikes: 4820,
    baseComments: 62,
    baseShares: 22,
    description: 'Terminando de arreglarme antes de salir 💫 Me gusta muchísimo este look: tiene ese balance perfecto entre frescura y elegancia que siempre busco. Los pequeños detalles lo son todo.',
    commentsList: [
      { id: 'c4', user: 'sofia_couture', avatar: av1, text: 'Siempre tan acertada con cada prenda, me fascina tu estilo 👌', time: '30m' },
      { id: 'c5', user: 'daniel.r', avatar: av4, text: 'Esa sonrisa lo ilumina todo!', time: '2h' },
      { id: 'c6', user: 'lucia_b', avatar: av3, text: '¿De dónde es ese top? Te queda espectacular 😍', time: '4h' },
    ]
  },
  {
    id: 'vid_7',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107430870.mp4',
    baseLikes: 7140,
    baseComments: 98,
    baseShares: 38,
    description: 'Este vestido merecía un video completo 🔥 Me siento absolutamente empoderada con este corte. A veces un solo detalle en el diseño transforma por completo tu actitud y presencia.',
    commentsList: [
      { id: 'c7', user: 'camila.v', avatar: av5, text: 'Ese vestido fue hecho a tu medida, te ves espectacular 🖤', time: '20m' },
      { id: 'c8', user: 'adrian_92', avatar: av2, text: 'Impresionante porte y elegancia, qué presencia!', time: '45m' },
      { id: 'c9', user: 'paula.estilo', avatar: av1, text: 'El negro nunca falla, diosa total 🔥', time: '2h' },
    ]
  },
  {
    id: 'vid_8',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107475115.mp4',
    baseLikes: 8950,
    baseComments: 128,
    baseShares: 53,
    description: 'Enfocada en lo que me hace feliz y me llena de energía positiva 💖 Agradecida por cada momento vivido y por tenerlos siempre aquí acompañándome.',
    commentsList: [
      { id: 'c_g1', user: 'valentina_m', avatar: av1, text: 'Qué belleza de video, se nota tu felicidad plena 💖', time: '8m' },
      { id: 'c_g2', user: 'mateo_s', avatar: av2, text: 'Esa energía tan bonita y transparente es única!', time: '30m' },
      { id: 'c_g3', user: 'caro_moda', avatar: av5, text: 'Guapísima Gisela, nos encanta este contenido ✨', time: '1h' },
    ]
  },
  {
    id: 'vid_9',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107621819.mp4',
    baseLikes: 5320,
    baseComments: 76,
    baseShares: 29,
    description: 'Detrás de cámaras de nuestra última sesión de fotos 🎬 Me encanta probar diferentes estilos y salir de mi zona de confort. Me sentí comodísima frente al lente de principio a fin.',
    commentsList: [
      { id: 'c10', user: 'felipe_lens', avatar: av4, text: 'Se nota que disfrutas cada segundo de la sesión 📸', time: '10m' },
      { id: 'c11', user: 'elena_sky', avatar: av3, text: 'Esa soltura frente a la cámara no se aprende, es puro talento!', time: '1h' },
      { id: 'c12', user: 'javi_m', avatar: av2, text: 'Gran trabajo en equipo, ya queremos ver las fotos finales 🙌', time: '3h' },
    ]
  },
  {
    id: 'vid_10',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107671455.mp4',
    baseLikes: 8950,
    baseComments: 142,
    baseShares: 58,
    description: 'Ese instante en el que cae la tarde y todo se tiñe de tonos dorados 🌅 Me siento tan en paz y agradecida con la vida. Estos minutos de tranquilidad valen oro.',
    commentsList: [
      { id: 'c13', user: 'andrea_sol', avatar: av1, text: 'La luz te acompaña de forma perfecta en este clip 🌅', time: '5m' },
      { id: 'c14', user: 'carlos.m', avatar: av4, text: 'Pura serenidad, te ves preciosa Gisela ✨', time: '25m' },
      { id: 'c15', user: 'mariana.p', avatar: av5, text: 'Qué toma tan armónica y bonita, transmite mucha calma!', time: '1h' },
    ]
  },
  {
    id: 'vid_11',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107830497.mp4',
    baseLikes: 2890,
    baseComments: 41,
    baseShares: 12,
    description: 'Arrancando la mañana con la mejor actitud y una taza de café ☕ Me siento genial, descansada y motivada para hacer que este día cuente al máximo. ¡Mucho ánimo a todos!',
    commentsList: [
      { id: 'c16', user: 'tomas_88', avatar: av2, text: 'Esa sonrisa mañanera alegra el feed de cualquiera ☕✨', time: '40m' },
      { id: 'c17', user: 'silvia_k', avatar: av3, text: 'Buenos días hermosa! Que sea una jornada muy productiva.', time: '2h' },
    ]
  },
  {
    id: 'vid_12',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775108236164.mp4',
    baseLikes: 7420,
    baseComments: 110,
    baseShares: 44,
    description: 'Me gusta mucho este look: minimalista, cómodo pero con ese toque sofisticado que no pasa desapercibido ✨ La clave está en no complicarse y lucir lo que te haga sentir tú misma.',
    commentsList: [
      { id: 'c18', user: 'valentina_m', avatar: av1, text: 'Menos es más, definitivamente acertaste con este outfit 👌', time: '12m' },
      { id: 'c19', user: 'rodrigo_b', avatar: av4, text: 'Súper chic y elegante, inspiración total 💖', time: '50m' },
      { id: 'c20', user: 'caro_moda', avatar: av5, text: 'Me encanta cómo combinas prendas tan limpias y modernas ✨', time: '2h' },
    ]
  },
  {
    id: 'vid_13',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775108096203.mp4',
    baseLikes: 4680,
    baseComments: 63,
    baseShares: 21,
    description: 'Riendo sin filtros ni poses ensayadas 🥰 Me siento libre y feliz cuando simplemente me dejo llevar por el momento. La risa sincera siempre es la mejor carta de presentación.',
    commentsList: [
      { id: 'c21', user: 'mateo_s', avatar: av2, text: 'Tu autenticidad es tu mayor encanto 😊', time: '18m' },
      { id: 'c22', user: 'paola_g', avatar: av3, text: 'Qué lindo verte reír con tantas ganas, contagias felicidad!', time: '1h' },
    ]
  },
  {
    id: 'vid_14',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107707998.mp4',
    baseLikes: 5890,
    baseComments: 82,
    baseShares: 31,
    description: 'Aprovechando la calidez del día para recargar energías ☀️ Me siento revitalizada cada vez que el sol acompaña. La luz natural hace que todo se perciba mucho más vibrante.',
    commentsList: [
      { id: 'c23', user: 'gaby_luna', avatar: av5, text: 'Brillas con luz propia en este video ☀️', time: '35m' },
      { id: 'c24', user: 'nicolas_p', avatar: av4, text: 'Esa energía cálida se siente a través de la pantalla!', time: '2h' },
    ]
  },
  {
    id: 'vid_15',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/2tokio.mp4',
    baseLikes: 9150,
    baseComments: 135,
    baseShares: 62,
    description: 'Noches con una vibra muy especial ✨ Me fascina este look nocturno y cómo las luces de fondo crean una atmósfera tan cinematográfica. Me siento genial, llena de energía y lista para disfrutar.',
    commentsList: [
      { id: 'c25', user: 'kenji_tokyo', avatar: av2, text: 'Las luces de fondo y tu look quedan de película ✨', time: '14m' },
      { id: 'c26', user: 'diana_wander', avatar: av1, text: 'Qué estilo tan sofisticado para la noche, me encanta!', time: '45m' },
      { id: 'c27', user: 'martin_c', avatar: av4, text: 'Esa seguridad al caminar es impresionante 💫', time: '2h' },
    ]
  },
  {
    id: 'vid_16',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/AQPeCdkH9RSHkV9NLw-LNiRJSC9HkCiz1lI0s71xxva0leQsMMA3cWZbn3a95jeOlIEjgul-qwPOp34yeVLWkXK0B3fNyhc3.mp4',
    baseLikes: 11400,
    baseComments: 178,
    baseShares: 75,
    description: 'Jugando con claroscuros y contrastes en esta toma íntima 🔥 Me gusta mucho la fuerza y el misterio que transmite este concepto. Me sentí súper inspirada creando esta pieza para ustedes.',
    commentsList: [
      { id: 'c28', user: 'sergio_lens', avatar: av4, text: 'La calidad visual de esta toma es de otro nivel ✨', time: '8m' },
      { id: 'c29', user: 'monica_chic', avatar: av3, text: 'Pura delicadeza y elegancia, impecable trabajo artístico.', time: '30m' },
      { id: 'c30', user: 'esteban.v', avatar: av2, text: 'Qué bien manejada la luz y la sombra, una toma de revista 🔥', time: '1h' },
    ]
  },
  {
    id: 'vid_17',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/Tokio.mp4',
    baseLikes: 8430,
    baseComments: 124,
    baseShares: 53,
    description: 'Caminando sin prisa, disfrutando del entorno y de la buena compañía 💫 Me gusta mucho este look casual: cómodo para andar todo el día pero sin perder un ápice de estilo. Me siento genial.',
    commentsList: [
      { id: 'c31', user: 'lorena_travels', avatar: av5, text: 'Ese estilo urbano te queda de diez, súper moderna 💕', time: '22m' },
      { id: 'c32', user: 'alex_f', avatar: av4, text: 'Caminar con esa actitud lo cambia todo!', time: '1h' },
      { id: 'c33', user: 'melissa.s', avatar: av1, text: 'Me encanta la paleta de colores de tu outfit de hoy 👌', time: '3h' },
    ]
  },
  {
    id: 'vid_18',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/adagaibor%20-%207574279326359670072.mp4',
    baseLikes: 6890,
    baseComments: 98,
    baseShares: 38,
    description: 'La verdadera elegancia nace de la seguridad que proyectas ✨ Me siento en mi mejor momento, disfrutando de cada paso del camino y celebrando quién soy con total confianza.',
    commentsList: [
      { id: 'c34', user: 'clara_b', avatar: av3, text: 'Esa seguridad frente a la cámara se transmite de inmediato ✨', time: '19m' },
      { id: 'c35', user: 'jorge_d', avatar: av2, text: 'Inspiradora y con un porte inigualable, un 10 total!', time: '1h' },
      { id: 'c36', user: 'isabel_fit', avatar: av5, text: 'Guapísima y con una presencia impresionante 💕', time: '2h' },
    ]
  },
  {
    id: 'vid_19',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/del.mp4',
    baseLikes: 4120,
    baseComments: 57,
    baseShares: 19,
    description: 'La belleza de los instantes casuales 🌸 Me gusta este look tan ligero y práctico para el día a día. Me siento fresca, relajada y lista para continuar.',
    commentsList: [
      { id: 'c37', user: 'natalia_p', avatar: av1, text: 'Qué frescura tan linda transmites en este clip 💕', time: '10m' },
      { id: 'c38', user: 'bruno_m', avatar: av4, text: 'Los looks sencillos y naturales siempre son los más atractivos!', time: '40m' },
    ]
  },
  {
    id: 'vid_20',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/jk.mp4',
    baseLikes: 7920,
    baseComments: 115,
    baseShares: 47,
    description: 'Total black con actitud definida 🖤 Me fascina este look; tiene esa fuerza que te hace sentir invencible desde que te lo pones. Los cortes precisos siempre hacen la diferencia.',
    commentsList: [
      { id: 'c39', user: 'daniela_style', avatar: av5, text: 'El conjunto monocromático te sienta espectacular 🖤🔥', time: '15m' },
      { id: 'c40', user: 'victor_k', avatar: av2, text: 'Fuerza, estilo y elegancia en un solo video!', time: '1h' },
      { id: 'c41', user: 'fernanda_v', avatar: av3, text: 'Simplemente impecable, no le sobra ni le falta nada.', time: '3h' },
    ]
  },
  {
    id: 'vid_21',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/miami.mp4',
    baseLikes: 10300,
    baseComments: 164,
    baseShares: 71,
    description: 'Días cálidos, brisa fresca y la mejor energía 🌴 Me gusta muchísimo este look veraniego: liviano, colorido y perfecto para sentir la brisa. Me siento súper feliz y renovada.',
    commentsList: [
      { id: 'c42', user: 'kevin_mia', avatar: av4, text: 'Esa vibra veraniega te queda perfecta, qué alegría transmites ☀️🌴', time: '7m' },
      { id: 'c43', user: 'sofia_couture', avatar: av1, text: 'Tu sonrisa lo dice todo, te ves encantadora!', time: '25m' },
      { id: 'c44', user: 'lucas_travel', avatar: av2, text: 'Qué buen conjunto para un día cálido, súper acertado.', time: '1h' },
    ]
  },
  {
    id: 'vid_22',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/oi.mp4',
    baseLikes: 5120,
    baseComments: 73,
    baseShares: 26,
    description: 'Un saludo cariñoso para toda esta linda comunidad ✨ Me siento genial de poder compartir estos pedacitos de mi vida cotidiana con ustedes y leer cada uno de sus mensajes.',
    commentsList: [
      { id: 'c45', user: 'angela_r', avatar: av3, text: 'Siempre tan atenta y cercana con todos nosotros ❤️', time: '11m' },
      { id: 'c46', user: 'felipe_lens', avatar: av4, text: 'Un abrazo fuerte Gisela, nos encanta verte por aquí!', time: '35m' },
    ]
  },
  {
    id: 'vid_23',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/op.mp4',
    baseLikes: 7840,
    baseComments: 119,
    baseShares: 49,
    description: 'Cuando la luz dorada baña todo y el momento se vuelve mágico 🌇 Me encanta este look con reflejos cálidos. Me siento plena, conectada y disfrutando del presente.',
    commentsList: [
      { id: 'c47', user: 'gabriel_ph', avatar: av2, text: 'La luz dorada te resalta increíblemente los rasgos 🌇✨', time: '14m' },
      { id: 'c48', user: 'marina_sun', avatar: av5, text: 'Qué momento tan sereno y qué belleza de video.', time: '50m' },
      { id: 'c49', user: 'carlos.m', avatar: av4, text: 'Atmósfera perfecta, estás divina.', time: '2h' },
    ]
  },
  {
    id: 'vid_24',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/playa.mp4',
    baseLikes: 14200,
    baseComments: 215,
    baseShares: 94,
    description: 'El sonido de las olas y la desconexión total 🌊 Me siento completamente renovada junto al agua. Me fascina este conjunto, súper cómodo para disfrutar de la tarde con libertad.',
    commentsList: [
      { id: 'c50', user: 'mariana.p', avatar: av1, text: 'Qué envidia de día junto al agua, te ves espectacular 🌊😍', time: '5m' },
      { id: 'c51', user: 'diego_sea', avatar: av4, text: 'La frescura que transmites es única, descansa y disfruta!', time: '20m' },
      { id: 'c52', user: 'valeria.m', avatar: av3, text: 'Hermosa toma, el mar siempre sienta de maravilla.', time: '1h' },
    ]
  },
  {
    id: 'vid_25',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/re.mp4',
    baseLikes: 8960,
    baseComments: 132,
    baseShares: 55,
    description: 'Creando cosas nuevas con muchísimo cariño y dedicación 💖 Me gusta este look de transición: versátil, dinámico y con mucha personalidad. Me siento muy emocionada por todo lo que viene.',
    commentsList: [
      { id: 'c53', user: 'elena_sky', avatar: av5, text: 'Qué ganas de seguir viendo tus creaciones 💖', time: '10m' },
      { id: 'c54', user: 'marcos_g', avatar: av2, text: 'Se nota el amor y el detalle que le pones a todo!', time: '40m' },
      { id: 'c55', user: 'diana_wander', avatar: av1, text: 'Siempre innovando y viéndote maravillosa, cuenta con nosotros ✨', time: '2h' },
    ]
  },
  {
    id: 'vid_26',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40gisela08.07_1775107877523.mp4',
    baseLikes: 9340,
    baseComments: 142,
    baseShares: 61,
    description: 'Cuando te sientes cómoda contigo misma, todo fluye de manera natural ✨ Me encanta este outfit ligero y la paz que transmite este rincón. Gracias por acompañarme siempre 🤍',
    commentsList: [
      { id: 'c56', user: 'valeria.m', avatar: av3, text: 'Qué elegancia y soltura, siempre transmitiendo paz ✨', time: '10m' },
      { id: 'c57', user: 'marcos_g', avatar: av2, text: 'Hermosa toma, el estilismo te queda de diez!', time: '35m' },
      { id: 'c58', user: 'claudia.fit', avatar: av5, text: 'Amo este video, tu autenticidad no tiene comparación 💕', time: '2h' },
    ]
  },
  {
    id: 'vid_27',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105428598.mp4',
    baseLikes: 8210,
    baseComments: 118,
    baseShares: 47,
    description: 'Disfrutando al compás de la música y compartiendo buenos momentos 🎶 La actitud positiva es el mejor accesorio que podemos llevar puesto cada día.',
    commentsList: [
      { id: 'c59', user: 'sofia_couture', avatar: av1, text: 'Ese carisma es único, qué alegría contagias! 💖', time: '15m' },
      { id: 'c60', user: 'daniel.r', avatar: av4, text: 'Un video lleno de vida y buena vibra ✨', time: '50m' },
      { id: 'c61', user: 'lucia_b', avatar: av3, text: 'Me encanta tu estilo, siempre tan espontánea 😍', time: '3h' },
    ]
  },
  {
    id: 'vid_28',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105461051.mp4',
    baseLikes: 6940,
    baseComments: 89,
    baseShares: 34,
    description: 'Un instante de diversión y desconexión total 💫 A veces solo hace falta sonreír y dejarse llevar por el momento presente.',
    commentsList: [
      { id: 'c62', user: 'mateo_s', avatar: av2, text: 'Qué linda sonrisa, tienes una chispa genial 😊', time: '20m' },
      { id: 'c63', user: 'caro_moda', avatar: av5, text: 'Precioso outfit y qué buena energía transmites ✨', time: '1h' },
    ]
  },
  {
    id: 'vid_29',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105487408.mp4',
    baseLikes: 7530,
    baseComments: 104,
    baseShares: 42,
    description: 'Momentos espontáneos que quedan grabados en el corazón 🌸 Viviendo cada día con gratitud y celebrando lo simple.',
    commentsList: [
      { id: 'c64', user: 'camila.v', avatar: av1, text: 'Súper dulce y natural como siempre 🤍', time: '12m' },
      { id: 'c65', user: 'adrian_92', avatar: av4, text: 'Gran clip, la frescura que tienes es incomparable!', time: '45m' },
    ]
  },
  {
    id: 'vid_30',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105563179.mp4',
    baseLikes: 8870,
    baseComments: 131,
    baseShares: 56,
    description: 'Explorando nuevas combinaciones y disfrutando de cada detalle ✨ La moda es una forma de expresión y juego constante.',
    commentsList: [
      { id: 'c66', user: 'valentina_m', avatar: av3, text: 'Ese look te queda fenomenal, pura inspiración 👌', time: '18m' },
      { id: 'c67', user: 'rodrigo_b', avatar: av2, text: 'Qué estilazo y presencia frente a la cámara!', time: '1h' },
      { id: 'c68', user: 'paula.estilo', avatar: av5, text: 'De mis videos favoritos de la semana, divina 🔥', time: '2h' },
    ]
  },
  {
    id: 'vid_31',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105619679.mp4',
    baseLikes: 6420,
    baseComments: 79,
    baseShares: 28,
    description: 'Buena vibra, ritmo y una sonrisa para alegrar la jornada 💖 Gracias a todos los que dejan su cariño en cada publicación.',
    commentsList: [
      { id: 'c69', user: 'elena_sky', avatar: av1, text: 'Siempre iluminando el feed con tu energía positiva ✨', time: '25m' },
      { id: 'c70', user: 'felipe_lens', avatar: av4, text: 'Excelente soltura y movimiento, una maravilla.', time: '1h' },
    ]
  },
  {
    id: 'vid_32',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105738133.mp4',
    baseLikes: 9650,
    baseComments: 147,
    baseShares: 65,
    description: 'Días soleados que invitan a crear y sonreír ☀️ Me encanta compartir estos instantes cotidianos con ustedes.',
    commentsList: [
      { id: 'c71', user: 'andrea_sol', avatar: av5, text: 'La luz natural te favorece muchísimo ☀️', time: '8m' },
      { id: 'c72', user: 'carlos.m', avatar: av2, text: 'Pura belleza y frescura en este clip ✨', time: '40m' },
      { id: 'c73', user: 'mariana.p', avatar: av3, text: 'Qué hermosa actitud, me encantó este reel!', time: '2h' },
    ]
  },
  {
    id: 'vid_33',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105766524.mp4',
    baseLikes: 7120,
    baseComments: 95,
    baseShares: 39,
    description: 'La belleza de ser uno mismo sin pretensiones ✨ Conectando con lo que de verdad importa y disfrutando el proceso.',
    commentsList: [
      { id: 'c74', user: 'monica_chic', avatar: av1, text: 'Tan cercana y auténtica, un placer verte por aquí 💫', time: '14m' },
      { id: 'c75', user: 'sergio_lens', avatar: av4, text: 'Gran ángulo y enfoque, te ves genial.', time: '55m' },
    ]
  },
  {
    id: 'vid_34',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105820814.mp4',
    baseLikes: 8340,
    baseComments: 116,
    baseShares: 50,
    description: 'Cambiando de ritmo y disfrutando del momento presente 💫 A veces un pequeño cambio de look renueva toda tu energía.',
    commentsList: [
      { id: 'c76', user: 'diana_wander', avatar: av3, text: 'Qué bien te sienta ese estilo, súper moderno!', time: '22m' },
      { id: 'c77', user: 'martin_c', avatar: av2, text: 'Una vibra espectacular, sigue compartiendo así 🙌', time: '1h' },
    ]
  },
  {
    id: 'vid_35',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105879364.mp4',
    baseLikes: 5980,
    baseComments: 74,
    baseShares: 25,
    description: 'Detalles cotidianos y miradas que lo dicen todo ✨ Un recuerdo especial que quise guardar en este espacio.',
    commentsList: [
      { id: 'c78', user: 'natalia_p', avatar: av5, text: 'Qué linda toma, tan espontánea y bonita 💕', time: '30m' },
      { id: 'c79', user: 'bruno_m', avatar: av4, text: 'La naturalidad siempre gana, un saludo fuerte!', time: '1h' },
    ]
  },
  {
    id: 'vid_36',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105907247.mp4',
    baseLikes: 7890,
    baseComments: 111,
    baseShares: 43,
    description: 'Viviendo con entusiasmo y buena música 🎶 Rodéate de lo que te sume y te haga reír sin medida.',
    commentsList: [
      { id: 'c80', user: 'daniela_style', avatar: av1, text: 'Qué energía más contagiosa, me encantó este clip 🔥', time: '10m' },
      { id: 'c81', user: 'victor_k', avatar: av2, text: 'Siempre con una sonrisa, pura simpatía!', time: '45m' },
    ]
  },
  {
    id: 'vid_37',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775105956926.mp4',
    baseLikes: 9120,
    baseComments: 139,
    baseShares: 58,
    description: 'Momentos únicos que inspiran y llenan de gratitud 💖 Me hace muy feliz leer sus comentarios y ver cómo nos apoyamos entre todos.',
    commentsList: [
      { id: 'c82', user: 'angela_r', avatar: av3, text: 'Gracias por compartir tu día a día con nosotros, eres un sol ❤️', time: '15m' },
      { id: 'c83', user: 'kevin_mia', avatar: av4, text: 'Excelente video, qué soltura frente a la cámara!', time: '35m' },
      { id: 'c84', user: 'sofia_couture', avatar: av5, text: 'Hermosa de pies a cabeza, qué porte ✨', time: '2h' },
    ]
  },
  {
    id: 'vid_38',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775106029976.mp4',
    baseLikes: 8460,
    baseComments: 122,
    baseShares: 51,
    description: 'La magia de los pequeños instantes compartidos ✨ Siempre agradecida con cada uno de ustedes por estar al otro lado.',
    commentsList: [
      { id: 'c85', user: 'gabriel_ph', avatar: av2, text: 'Qué calidad y armonía en este video 🌇✨', time: '12m' },
      { id: 'c86', user: 'marina_sun', avatar: av1, text: 'Tu contenido siempre aporta paz y alegría.', time: '50m' },
    ]
  },
  {
    id: 'vid_39',
    url: 'https://pub-48a3d2a525fb49acb6af0cbe634de724.r2.dev/ssstik.io_%40la.guerita0137_1775106072457.mp4',
    baseLikes: 10450,
    baseComments: 168,
    baseShares: 72,
    description: 'Cerrando el día con la mejor energía y el corazón contento 💫 Cada paso cuenta cuando caminas hacia lo que sueñas.',
    commentsList: [
      { id: 'c87', user: 'clara_b', avatar: av3, text: 'Un cierre perfecto de video, te ves fantástica ✨', time: '7m' },
      { id: 'c88', user: 'jorge_d', avatar: av4, text: 'Qué gran vibra transmites, un 10 total!', time: '28m' },
      { id: 'c89', user: 'isabel_fit', avatar: av5, text: 'Pura inspiración y belleza, un abrazo grande 💕', time: '1h' },
    ]
  }
];
