# Proyecto-JeR

# 1-Introducción
Este es el documento de diseño de juego de “Cursed Trinity”. Un juego para PC que pretende explorar las posibilidades de una modalidad cooperativa para un juego de aventura y mazmorras usando funcionalidades de conexión online.
## Concepto del juego
“Cursed Trinity” es un videojuego en el que controlamos a tres héroes cada uno portador de un arma maldita. La Espada Renegada, el Arco Corrupto y el Tomo Oscuro. Todos ellos aún con sus particularidades, deberán abrirse paso a través de la mazmorra del malvado Furciferus hasta derrotarlo.
Características principales

El juego se basa en los siguientes puntos:
- Planteamiento sencillo: la trama se usará únicamente para dar contexto y un objetivo a los jugadores, pero en el transcurso del juego lo que primará será la jugabilidad.
- Cooperación: para fomentar el trabajo colaborativo entre los jugadores se implementarán puzzles que requieran de las diferentes habilidades de los personajes, por lo que será imposible avanzar en solitario.
- Nostalgia: el juego emulará tanto estéticamente como jugablemente juegos de acción y aventura más clásicos como los The Legend of Zelda o Terranigma.
- Duradero: debe ser longevo y capaz de insertar nuevas mazmorras, puzzles y enemigos de forma sencilla. 
## Género
Se ha establecido que Cursed Trinity es una unión de diferentes géneros. A continuación se enumeran y se presentan los motivos:

- Dungeon crawler: la característica fundamental de los dungeon crawler es la exploración de mazmorras. A partir de ahí el género puede tomar diversos caminos o coger elementos de otros géneros como los roguelike (Pokémon Mystery Dungeon) o los RPG (Etrian Odyssey). En nuestro caso el combate estará más orientado a la acción y sin una progresión de recogida de objetos.

- Aventura: es un género en el que entran todos los juegos cargados de misiones, acción, puzzles y sobretodo una historia que contar. Algún ejemplo es el antiguo The Legend Of Zelda (Nintendo) o más nuevo como Uncharted (Naughty Dog).

## Propósito y público objetivo
Los motivos para la realización de Cursed Trinity son dos. Por un lado para desarrollar un tipo de juego que cada vez está un poco más olvidado y por el otro lado para crear una experiencia colaborativa que permita a los jugadores divertirse juntos sin tener que competir entre ellos como es tan habitual en la industria.

Cursed Trinity está dirigido a un amplio abanico de edades. Al ser un juego cooperativo (con la posibilidad de jugarlo en solitario) está pensado para ser jugado por varias personas a la vez, compartiendo una experiencia que para algunos será nostálgica y para otros una primera experiencia en el género por lo que se tratará de conseguir que ambos extremos puedan disfrutar por igual de la experiencia. La historia es sencilla para permitir a los jugadores jugar de forma ocasional. 

## Jugabilidad
Cada planta de la mazmorra está compuesta por diversas habitaciones que los héroes tendrán que visitar para encontrar las tres Gemas de Éter con las que abrirán la puerta a la siguiente planta. Para ello nos valdremos de los siguientes elementos:

- Movilidad: los personajes se desplazaran de habitación a habitación para poder conseguir las Gemas de Éter y pasar a la siguiente planta.
Armas:Cada uno de los héroes presenta un arma diferente que puede ser utilizada tanto en combate como para resolver diferentes tipos de puzzles, cada una con formas de ataque distintas.
- Puzzles: los puzzles podrán ser de distintos tipos, pero estarán siempre enfocados a abrir caminos o desbloquear zonas para seguir avanzando. Para ello se aprovecharán por un lado las mecánicas de movimiento estándar de los personajes y por otro las habilidades únicas de cada uno.
- Combate: se contará con dos estilos de combate básicos. Por un lado el combate cuerpo a cuerpo del héroe que usa la espada y por el otro el combate a distancia de los héroes que usan el arco y el tomo.

## Estilo Visual
Cursed Trinity tendrá un apartado visual bastante sencillo usando simpáticos sprites de estética pixel art tanto para personajes y enemigos como mecanismos y escenarios. 

## Alcance
El objetivo principal es desarrollar un juego sólido al que podamos introducir nuevas “dungeons”. En principio se desarrollará un contenido básico que próximamente será ampliado en las siguientes actualizaciones del juego.

# 2-Mecánicas de juego
En este apartado se profundizará en las diferentes mecánicas que componen a Cursed Trinity ahondando en los diversos fundamentos de su jugabilidad y explicando el rango de acción de los jugadores.
## Jugabilidad
- Movimiento: los personajes podrán moverse por todo el escenario con WASD para progresar con la aventura, pero no poseen más mecánicas de movimiento como puedan ser esquivar, rodar o saltar.

- Puzzles: los diferentes caminos para avanzar estarán cerrados temporalmente hasta que los jugadores resuelvan algún tipo de puzzle que por lo general se centrarán en activar mecanismos aprovechándose tanto de su entorno como de sus habilidades únicas.

- Combate: los enfrentamientos en el juego serán simples. Cada jugador tendrá un tipo de ataque diferente, pero todos funcionarán bajo la misma premisa. Los puntos de salud se organizarán en corazones o cualquier elemento gráfico de índole similar, con lo cual los golpes que reciba el jugador restarán una cantidad determinada de dichos corazones en función del enemigo. Esto también se aplica a la inversa excepto porque no se podrá visualizar la salud restante de los monstruos y demás criaturas adversas.

- Recursos: de vez en cuando los enemigos podrán dejar caer ciertos ítems tras morir. Estos objetos serán o bien para que un jugador pueda recuperar algo de salud o bien llaves que abran una puerta cerrada hasta ese momento.

- Dificultad: el juego tratará de ser accesible para todos los jugadores y subirá ligera y progresivamente la dificultad del juego cuanto más se avance. Esto se logrará haciendo puzzles más complejos, colocando enemigos más fuertes o mejor posicionados y requiriendo de más trabajo en equipo.

- Armas Malditas: Las diferentes armas malditas que portan los personajes servirán para acabar con enemigos determinados como jefes de la mazmorra y serán útiles también para resolver puzzles un tanto más difíciles.  
  - Espada: La espada golpea hacia delante a los enemigos en un ataque cuerpo a cuerpo. También puede ser utilizada para cortar cuerdas, romper telarañas o activar interruptores.
  - Arco: El arco golpea con una flecha a los enemigos a distancia. También puede activar interruptores lejanos a donde no llegue la espada.
  - Tomo: El tomo es capaz de hacer magia con la que podrá lanzar bolas de energía a los enemigos así como abrir paso por las paredes agrietadas.
  
## Flujo de juego
A lo largo de esta sección se detalla el transcurso de una partida típica de Cursed Trinity. Se comentarán los pasos que han de seguir los jugadores desde el inicio del juego hasta completar un piso de la mazmorra. Poco a poco vamos desgranando el funcionamiento exacto del juego, en esta sección describimos las mecánicas. Más adelante se definirá el contenido de cada pantalla.

El jugador inicia Cursed Trinity con una pequeña cutscene en la que se explicará brevemente la trama del juego:

“La Muerte preguntó una vez:¿qué es lo que más deseas? Oro dijo uno, fama dijo otro, poder dijo el último. Ninguno consiguió lo que quería. Ninguno dio la respuesta que la Muerte deseaba. Ninguno salió indemne. Tres armas se crearon con las lágrimas de ella, tres armas perversas que serían portadas por tres malditos. Hasta el final de sus vidas”.

Se le presenta el Menú Principal. Si desea iniciar una partida el Jugador seleccionará la opción Jugar. Lo siguiente visible será una pantalla con dos opciones: Crear Partida, el cual llevará directamente a la pantalla de Selección de Personaje, y Unirse a partida, en el cual tendrá que escribir el código que aparecerá en la  pantalla de Seleccion de Personaje. Tras esto tendrá que elegir el personaje que llevará a lo largo de la partida. Los personajes disponibles son Blade, Arrow y Cauldron. 

El personaje empieza entrando en la primera planta de la mazmorra. Tendrá plena libertad para moverse por la sala ya que no habrá nada más allá de las diversas puertas a otras salas. Las habitaciones son cuadradas, todas del mismo tamaño, y pueden tener de 1 a 4 salidas, algunas salas no llevarán a ninguna parte, otras solo servirán para activar una puerta en otra sala, etc… Habrá 4 tipos de habitaciones:

 - Sala de Combate: Los jugadores encontrarán una sala llena de monstruos que tendrán que derrotar para poder salir del cuarto.
 - Sala con Puzzle: Los jugadores encontrarán en la sala un puzzle que tendrán que resolver, normalmente después de acabar con los pocos enemigos que hay esperando.
 - Sala del Cofre: Los jugadores encontrarán un cofre con una poción de curación en su interior o una llave pequeña que abre alguna puerta.
 - Sala sin salida: Todas las salas anteriores pueden ser, además una sala con una entrada y una salida.

Si uno de los personajes pierde todos sus puntos de vida, otro de los jugadores podrá revivirlo perdiendo uno de sus corazones para dárselo al otro. Si todos mueren se mostrará un mensaje de “Game Over” y la mazmorra se reiniciará. 

Cada parte de la mazmorra estará dividida en 4 plantas, 3 normales y una última para el enfrentamiento contra el boss. Cuando los jugadores derroten al Boss podrán continuar bajando la mazmorra siguiendo el mismo flujo ya explicado. Tras un número al azar de zonas los jugadores llegarán al boss final la cual será la mismísima Muerte. Cuando el boss final sea derrotado el juego terminará y los jugadores serán enviados al Menú Principal.

Cuando lo desee, el Jugador podrá regresar a pantallas anteriores o al Menú Principal . Más adelante se mostrarán todas la posibilidades de flujo entre pantallas.  

## Personajes
En esta sección se van a enumerar y describir los diferentes personajes que aparecerán en el juego Cursed Trinity así como sus habilidades y comportamiento.

 - Blade
    - Descripción: Es uno de los protagonistas del juego. Era un guerrero que compró una espada para poder ser el más poderoso de todos los guerreros, pero esa arma le costó la maldición que ahora recae sobre él. Es un hombre fuerte, arrogante y orgulloso de sí mismo.
    - Puntos de salud: 5 (se pueden recuperar al derrotar enemigos).
    - Ataque de espada: ataque cuerpo a cuerpo que resta 1 punto de salud a los enemigos. Para que surta efecto la espada debe alcanzar al objetivo en el ataque.
    - Maldición: el arma copia la peor faceta de su usuario, en este caso el orgullo de Blade lo que provoca que tras cada golpe aumente la probabilidad de que la espada se niegue a obedecer al espadachín.
 - Arrow
    - Descripción: Es uno de los protagonistas del juego. Un cazarrecompensas que un día encontró un extraño arco entre las posesiones de uno de los criminales que capturó, aunque al principio le pareció una suerte haberlo encontrado luego descubriría la maldición que le acompaña. Es un hombre despistado, divertido y muy sociable.
    - Puntos de salud: 5 (se pueden recuperar al derrotar enemigos).
    - Ataque de arco: ataque a distancia que resta 1 punto de salud a los enemigos. Para que surja efecto la flecha debe alcanzar al objetivo en el ataque.
    - Maldición: cada flecha contiene parte de los recuerdos de Arrow. Con lo cual para evitar perder la memoria por completo debe recoger las flechas que dispara. Cuenta con 4 de estas flechas.
 - Cauldron
    - Descripción: Es uno de los protagonistas del juego. Ser arcano que trató de usar el poder del tomo oscuro para conseguir la belleza absoluta, lo que no sabía es que la maldición que acompañaba al libro solo le dejaría más lejos de su objetivo.Ser despiadado y sarcástico, pero capaz de colaborar con otros para cumplir sus objetivos.
    - Puntos de salud: 5 (se pueden recuperar al derrotar enemigos).
    - Hechizo: ataque a distancia que resta 1 punto de salud al enemigo, pero que tras impactar hace una explosion a su alrededor que quita otro punto de salud.
    - Maldición: abusar del tomo tiene efectos adversos para su usuario. Tras lanzar tres hechizos seguidos el siguiente tendrá más potencia aún (restando 1 punto de salud extra al enemigo) pero a cambio el propio Cauldron también pierde 1 punto de salud.

 - Araña de Cristal
    - Descripción: Arañas normales corrompidas por el poder de la Muerte para combatir a su lado. Es el enemigo más común del juego.
    - Puntos de salud: 2
    - Ataque: corre hacia el héroe más cercano y al chocar con él le quita 1 punto de salud.

 - Vigilante Artificial
    - Descripción: Son la primera línea de defensa de la Muerte. Son débiles y sin conciencia ya que son controlados por la muerte misma. 
    - Puntos de salud: 5
    - Ataque: vuelan hacia el héroe más alejado y al llegar allí explotan haciendo 2 puntos de salud a los enemigos adyacentes.

 - Diablillo Llorón
    - Descripción: Pequeños seres del inframundo que viven en eterno dolor, llenando todo de lágrimas a su paso mientras son controlados como títeres por la propia Muerte.
    - Puntos de salud: 7
    - Ataque: ataca a distancia con sus llantos y lamentos restando 2 puntos de salud a aquellos que alcanzan.
 - La Muerte
    - Descripción: Es la encargada de recoger las almas de los fallecidos. Tras preguntarle a los héroes cuál era su deseo, estos le respondieron con respuestas egoístas y superficiales por lo que ella les castigó con una maldición.
    - Puntos de salud: 20
    - Ataque: cuenta con varias manos que actúan de forma independiente. Unas pueden golpear físicamente a su adversario restándole 3 puntos de vida y otras pueden lanzar rayos de llamas azules que restan otros 3 puntos de vida. 

## Movimiento y físicas
### Interacción entre elementos

Cursed Trinity se desarrolla sobre un plano 2D y tanto los enemigos como personajes pueden desplazarse por él. El escenario contará con diferentes elementos que funcionarán como obstáculos. Algunos de ellos podrán romperse, como las paredes agrietadas que desaparecerán con el hechizo de Cauldron. 

Otros elementos del escenario funcionarán como activadores con los que se abrirán puertas, se construirán puentes, etc, es decir, serán la solución a los puzzles que los jugadores tendrán que resolver.

Los enemigos atacan cuerpo a cuerpo por lo que han de estar próximos a los jugadores para golpearle así como la espada de Blade debe tocar a los enemigos de la mazmorra para hacerles daño. Las flechas y los hechizos de Arrow y Cauldron respectivamente, se definen como proyectiles que tendrán de golpear al enemigo para que reciban el daño. 

Para que los personajes puedan recuperar corazones se les dará la capacidad de soltar corazones a los enemigos cuando sean derrotados. Si uno de los jugadores pierde todos sus corazones otro podrá cederle uno de los suyos para revivirlo y así pueda continuar jugando.

Las colisiones que se producirán:

- Personaje - Personaje (cuando un jugador pierda toda su vida y uno de ellos se acerque a él para cederle uno de sus corazones)
- Personaje - Escenario (cuando Blade rompe las telarañas que se encuentran en el escenario)
- Personaje - Enemigo (cuando un ataque por parte del jugador impacta al enemigo)
- Enemigo - Personaje (cuando un ataque por parte del enemigo impacta al jugador)
- Proyectil - Escenario (cuando una flecha de Arrow impacte en un interruptor o una bola de fuego impacte en una pared agrietada)
- Proyectil - Enemigo (cuando una flecha de Arrow o una bola de fuego impacta a un enemigo)
- Personaje - Items (cuando un jugador se acerque a una poción de salud este la recogerá cuando choque con ella)
 

## Controles

- Movimiento: teclas W, A, S, D.
- Apuntar: movimiento del ratón.
- Atacar: Click izquierdo. 
- Curar compañero: estando a su lado pulsar la barra espaciadora.

# 3-Interfaz
En esta sección se especificará con detalle cada una de las pantallas que componen “Cursed Trinity”. Además, se indicarán las transiciones entre ellas así como la utilidad de cada elemento de la GUI (Graphical User Interface). Las imágenes adjuntas son bocetos que ilustran los componentes que debe contener cada pantalla, no obstante, los artistas podrán (y deberán) hacer cambios en la apariencia y disposición de los elementos si así lo consideran oportuno.  
 
## Diagrama de flujo
En este diagrama de estados se muestran todas las pantallas que se podrán ver a lo largo del juego y cómo se llega a cada una de ellas.

 - Menú principal
    - Botón jugar: Al pulsarlo lleva a la pantalla de Selección de Partida.
    - Botón salir: al pulsarlo nos lleva de vuelta al Sistema Operativo.

  - Selección de Partida
    - Botón Crear Sesión: Al pulsarlo lleva a la pantalla de Selección de personaje creando nuestra propia partida.
    - Botón Unirse Sesión: tras poner el código en el recuadro y pulsarlo nos lleva a la pantalla de Selección de personaje 
 
  - Selección de Personaje
    - Botón Empezar: Al pulsarlo entrarás directamente en la mazmorra.
    - Botón Volver: Al pulsarlo volverás a la pantalla de Selección de Partida
    
    
 #  4-Arte
Uno de los puntos en los que se sustenta Cursed Trinity es la nostalgia por lo que se apostará por usar una estética 2D en pixel art. La trama contiene unos tintes bastante oscuros, pero el objetivo del juego no deja de ser que los jugadores colaboren entre ellos y se diviertan por lo que el arte tratará de no ser demasiado oscuro ni demasiado alegre, creando un balance para que ambas ideas puedan convivir. 

## Arte 2D
Las imágenes usadas están en formato .png por su alta calidad y la facilidad de ser integradas por las transparencias de sus fondos. Además, se guardarán siempre los archivos en formato de edición originales.

## Sprites
  - Arrow (animación estática, de movimiento, ataque, recibir daño y muerte)
  - Blade (animación estática, de movimiento, ataque, recibir daño y muerte)
  - Cauldron (animación estática, de movimiento, ataque, recibir daño y muerte)
  - Araña de cristal (animación de movimiento)
  - Vigilante artificial (animación de movimiento y ataque)
  - Diablillo llorón (animación de movimiento y ataque)
  - La Muerte (animación estática y de ataques)
  - Palancas (dos posiciones)
  - Tiles
  - Suelo
  - Paredes
  - Puertas
  - Otros
  
# Audio
## Música
  - Menú principal: música tranquila pero alentadora que anime al jugador a entrar en una partida rápidamente.
  - Juego: una melodía mucho más enérgica y épica pero sin excederse para no resultar cargante.
  - Boss final: un tono mucho más épico y tenso que el anterior, pero con puntos más suaves para que no sea demasiado dramática.
  - Victoria: música triunfal y heróica que sirva como recompensa en sí misma al jugador.
  - Derrota: triste y calmada para que los jugadores puedan reflexionar sobre sus errores en la anterior partida y reintentarlo.
## Efectos
  - Correr: sonido de pisadas rápidas
  - Impacto de espada
  - Impacto de flecha
  - Impacto de magia
  - Efectos de Araña de Cristal: sonidos del movimiento de sus patas
  - Efectos de Vigilante Artificial: sonido de su movimiento, de su cuenta atrás y explosión
  - Efectos del Diablillo Llorón: sonido de su movimiento y de sus llantos.
  - Efectos de la Muerte: sonido de los ataques del jefe.
  - Efecto de palanca
  - Efecto de pérdida de salud


