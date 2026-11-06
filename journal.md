# Reflective Journal


## 2026-11-6 (part 2)
> Finally, with both forwards and backwards FABRIK code, I use them in unison to create a believable, procedurally animated lizard. I used the forward algorithm from _Kingsnake_ to make the body, and the anchored arm IK form _Rat Grabber_ for the arms and legs of the lizard. As simple as mixing the two sounds, the logic is quite complicated, as I needed to keep track of whether the limb was on the left or right, as well as if it was the front or hind pair of legs. The latter was important since the hind legs needed to bend in the opposisite direction. Notably, the code i made prior for bending the middle joints (or elbows) of the limb joints came in useful, and was customizable for clock or counter-clock bending joints. That algorithm is very cheesy, as it doesn't actuall measure angles and constrain them, but rather apply a very small vector rotation in either direction to force the limb to bend a certain way when folding inwards. When folding particularly close by bringing the target on top of the root, the elbow would circle around the root wildly, and we dont want that. So, to fix this I made the small rotational vector diminish as the target got close to the root. The result of this is a cool looking lizard animation, with bright colors. My hopes in taking this project further would likely involve giving the lizards their own autonomy in navigating the canvas, as well as perhaps coding behaviour like eating and breeding. Breeding in particular could open the doors to interesting experiments with lizard genetics, as individuals can differ very slightly based on their body construction parameters, leading to unique differences in color, size, proportions, etc... So far my proudest prototype to date.
>[Procedural Lizard](./prototypes/arrays/lizard-sim/index.html)
>![debug-lizard-img](./assets/images/lizard-debug.png)

> The screenshot provided is one of the debug body rigs I used to debug issues with the elbow bending, along with general purpose coding. I find rigs like these are necessary before any flash stuff is implemented, as it allows for a better understanding of your program and its potential shortcomings/oversights.


## 2026-11-6 (part 1)
> With the forward FABRIK algorithm done, I needed to code the backwards part as well, and add them together. What i was making here was a sort of robotic arm simulation, where the arm attempts to reach where the mouse is pointing while being anchored to the screen border. Notably, the arm bends with a preference to the clockwise direction, a customizable feature that makes this prototype look a little lopsided at times, but will be very useful in prototype 3. For now, I created a simple minigame where you must grab rats and place them in a container as they run around wildly trying to escape. They may also escape from the container, although very slowly. The limb construction uses a similar structure to the _Kingsnake_ prototype prior.
>[Rat Grabber](./prototypes/arrays/ik-arm/index.html)
>![grabber-img](./assets/images/ratg-rabber.png)


## 2026-11-03
> I wanted to get my hands dirty with inverse kinematics again, since last time wasn't technically IK. A solid place to start was with the FABRIK algorith, which is basically a way to connect a root node to a target node in a manner that looks natural. FABRIK works in 2 parts, it aims the head node to the target and pulls along all the others (forwards), and if that causes the root node to misalign with its archor point, then the process is repeated until both the root and head are anchored where they need to be, or until the root is anchored and the joints make a straight line to the target in the case of it being out of reach (backwards). For now, I'll implement the forward part to drag along a set of joints, making a snake. I used a minimim angle between joint segments to make sure the snake isnt collapsing on itself, as well as making it look better overall. Notably, its body is constructed using a long array of joints, which are comprized of circle radii, along with colors for each joint.
>[Kingsnake Simulation](./prototypes/arrays/kingsnake/index.html)
>![kingsnake-img](./assets/images/kingsnake.png)


## 2026-10-27
> I've recently been interested in messing with inverse kinematics, so I decided on making a simulation tail-like appendage. For this prototype I created an array of ellipses that are coupled to eachother, are affected by gravity, and have additional influence on their neighbors. While simple in concept, the physics are percisely tuned based on my initial inspriation.
> In its current state, the appendage only moves from its base, while the rest follow. Since the sim uses a combination of Hooke's law and the critical damping formula, the appendage feels very spring like, and not as much like a tail as I imagined. Perhaps I'll do more research in what physics model to use in the future.
>[Tail Simulation](./prototypes/functions/inverse-kinematics/index.html)
>![kinematics-img](./assets/images/kinematics.png)


## 2026-10-24
> My inspiration for this prototype was of old gameboy games, and how, at that time, game states could now be saves in a piece of hardware with its own memory. My prototype consists of a simple grid-based game where you can place and remove cells from the sandbox. What sets it appart however, is how you can choose to download a "cartridge" (which is essentially an empty JSON save file), and "dock" it to the webpage. Upon clicking "eject", all changes made to the sandbox will be saved into the "cartridge", and can be reloaded into the sketch at any later time, even after refreshing the page. 
> NOTE: If the act of docking the save file is blocked by your browser, you can play in stateless mode, which is essentailly the same sandbox game without the saving features.
> This is a personal favorite of mine, as it facilitates persistent and personalized sandbox instances to mess around with.
>[Antfarm, for the Nontendo Gameman](./prototypes/functions/cartridges-generator/index.html)
>![antfarm-img](./assets/images/cartridge.png)


## 2026-10-23
> I wanted to improve upon my previous prototype _Rookie Combat_ (see prev entry), as there were several things I wasn't happy with. After in-class testing, I realized that my keyboard only allowed up to 5 or so inputs at a time, and since there were many controls for multiplayer, some of your inputs would get eaten. Additionally, with how small the bounds of the game were, as well as how much realism I coded into the flight physics, there was little room for maneuvering. I decided I wanted to instead make a single player experience, and a procedurally generated map, with the player in the center, and all other objects moving relative to it. The procedural terrain alone was far too ambitious, as even though I already experimented with it in another project, making transitions between terrain chunks was very difficult to do seamlessly, so I sacrified a lot of the resolution of the background. Even now there are visible chunk borders sometimes. As of the current build, enemy fighters do not move in relation to the player, instead just flying across the canvas. Ill need to account for this later if I'm to improve on this prototype. For now though, flighing around is fairly smooth and satisfying.
>[Veteran Combat](./prototypes/functions/veteran-combat/index.html)


>![veteran-img](./assets/images/veteran.png)


## 2026-10-19
> For my final prototype of the events module, I wanted to make a local multiplayer game to play with buddies. This one can be played with 2, and potentially up to infinite players, as long as your keyboard has enough keys. Although for now ill stick to 2 players for this prototype, adding more is as simple as declaring a new player object in setup, along with their prefered control scheme.
> Each player can increase/decrease their throttle, turn left or right relative to their aircraft, as well as fire bullets.
> I leaned more into realism for the flight physics. Each aircraft has energy which is needed to make turns and depletes when turning, accelerates when moving in a straight line, and carries some momentum on turns. With this configuration, energy and momentum is a resource you need to manage in order to out-maneuver you opponent. My vision was for it to be more strategic, rather than arcadie.
> Tip: Your energy regenerates when moving straight, and will regenerate faster depending on your throttle!
>[Rookie Combat](./prototypes/events/rookie-combat/index.html)
>![rookie-img](./assets/images/rookie-combat.png)


## 2026-10-15
> This prototype consists of a silly bee simulator, where you collect pollen and grow as a result, becoming heavier. 
> The main focus was to make a control scheme that felt smooth at first, but purposefully clunky later on. Also for dynamic buzzing sound pitch influenced on your size, if you're currently flying upwards, falling, or grounded.
> Pollen spawns randomly and will bounce off the walls if it attempting to move out of bounds, much like the player.
> At a certain weight it becomes impossible to fly, which is why pressing **SPACE** will shake the bee, ridding it of excess pollen.
> The background is taken from my favorite game of all time _Rain World_!
>[Obeese](./prototypes/events/obeese/index.html)
>![obeese-img](./assets/images/obeese.png)


## 2026-10-13
> I wanted to make a wizard game, with different spells that the player can use, each with their own strengths. This was far more ambitious than i was capable of, since i needed to make 3 more prototypes. The final product isnt quite perfect, and i definitely fell victim to scope creep. The main focus was supposed to be the spells, with fireball being your main source of splash damage at a steep mana cost, magic missile as your spammable weak attack, and freeze as your utility spell for handling large waves of enemies. Overall the spells came out great, however I wish there was more enemy class variety. Perhaps thats for a future implementation. For now skeletons rush at you from the screen borders, spawning faster and faster as the game progresses.
> I still wasnt quite finished with perlin noise. I thought it'd make a great background for the wizard game with muted, cave-like colors.
>[Shadow Wizard Money Gang](./prototypes/events/wizardry/index.html)
>![wizardry-img](./assets/images/wizardry.png)


## 2026-10-6
> With the last map being so sandy, I figured I'd lean more into that direction but with a flavour of fantasy. I added support for tweaking the colors of the map in hex, as opposed to cryptic looking rgb values of known colors. I added a langer range of sand and chose wacky colors. The colors almost look like a sort of heat map, or as if some kind of posterization filter was added to the terrain.
>[Blue Sand Desert](./prototypes/conditionals/blue-sand-desert/index.html)
>![blue-sand-img](./assets/images/blue-sand.png)

> For the last protoype, I wanted to make an explorable terrain map with a movable player. I'm not going to bore with details since its mostly technical. What I can say is I wouldve liked to feature some sort of goal to turn this piece into a game, but due to time concerns there isn't much to do other than endlessly wander the terrain. Good thing it's infinite!
**Player can be controlled with WASD!**
>[Procedural Explorer](./prototypes/conditionals/procedural-explorer/index.html)
>![procedural-img](./assets/images/procedural.png) 


## 2026-10-3
> I had the idea to use perlin noise to generate procedural images in p5.js. I've done some work on this subject previously in unity engine, but I was curious about how that would look like in p5. My first working iteration came out farily well. I mimicked previous projects of mine which mostly featured an image akin to tropical terrain, with an even amount of land and ocean, and strong emphasis on the sandy areas as opposed to a map of earth in real life. A more realistic map might have more water and less or no sand, but perhaps that for a future prototype. As of now, the only parameters that can modify the map are the outer bounds, as well as the scale of the noise. There are some elements I'd like to improve on later, such as adding support for layering octaves of perlin noise, and allowing control over parameters such as persistence and lacunarity for finer details. On a side note, I've noticed that noise generates repeating patterns at a large scale. Unless I'm missing something I'm not aware of, this differs from the noise function in the unity engine, as it produces a much more natural pattern, although I could be missing something here.
>[Perlin Terrain](./prototypes/conditionals/perlin-terrain/index.html)
>![perlin-img](./assets/images/perlin.png)


## 2026-09-28
> I decided to embrace the chaos and created a version of the basic fish simulation idea but with boosted mutation rates and algae spawns. This Leads us to an environment akin to the Cambrian Explosion.
>[Cambrian Explosion](./prototypes/variables/cambrian_explosion/index.html)
>![cambrian_explosion_ss](./assets/images/cambrian_explosion.png)


## 2026-09-27
> Working on the Mr. Furious challenge made me realise the potential p5 holds in making a simulation type of scene. I designed a rudimentary version of what I'd later expand into evolution simulators, with a simple Sisyphean fish that endlessly eats algae for all of eternity. I say its eternal, since in theory each individual algae has a very small chance to duplicate, which can lead to a real eternal ordeal given enough of them on screen.
>[Sisyfish](./prototypes/variables/sisyfish/index.html)
>![Sisyfish](./assets/images/sisyfish.png)
> With this basic system allowing objects to be stored in memory and moved around, I decided experimenting with species reproduction by allowing fish to reproduce when they've filled their stomachs. This went horribly wrong for a while, leading to wars between fish and algae populations attempting to overpower the other.
>![population_bomb_ss](./assets/images/population_bomb.png)
> After much trial and error, I finally bit the bullet and manually capped the amount of algae that can spawn in a given region, making the simulation play out much more predicatbly. Perhaps I'll implement a more intricate system for flattening algae population at high concentrations later, but this will do for now.
>[Fihmulation](./prototypes/variables/fihmulation/index.html)
>![fihmulation](./assets/images/fihmulation.png)
> This iteration behaves more like a rudimentary evolution simulator, mimicking the process of natural selection by creating competition for limited food resources, as well as allowing fish to reproduce with a chance of random mutations being bestowed to their offspring. The Fihmulation is mesmerizing.


## 2026-08-22
> After completing the second challenge, I had a working earth and moon orbit model that I wished to take further.
> [Instructions Challenge](./topics/instruction-challenge/index.html)

> My first idea was to create a simple skybox and apply it to the scene.
> ![vaporwave_ss](./assets/images/vaporwave.png)
> This looked alright, but i really wanted distant stars to be visible, and painting a skybox full of them would prove too tedious...
> [Vaporwave](./prototypes/instructions/vaporwave/index.html)

> So, for my second prototype I decided I'd manually place spheres in the sky with a texture of our sun wrapping them. Manually placing them gave me much more control over fine tuning the distance, size, size randomization, amount, etc... to fit my vision.
> ![sky_full_of_stars_ss](./assets/images/sky_full_of_stars.png)
> I really liked how the complex sun texture made the stars twinkle yellow and orange as I scrolled around the viewport.
> ![sky_full_of_stars_ss](./assets/images/sky_full_of_stars2.png)
> Randomizing the star placement in a sphere around the earth also creates cool effect!
> [Sky Full Of Stars](./prototypes/instructions/sky_full_of_stars/index.html)

> Lastly i wanted a piece that captured the truly incomprehansible size of celestial bodies. So, using the sun texture form before, I place a giant sun right next to the earth. I made the model to scale for the most part, with the sun being 109 times larger than the earth.
> ![impending_ss](./assets/images/impending.png)
> Overall, the scene makes our sun appear very imposing, almost like it's about to swallow the earth.
> [Impending](./prototypes/instructions/impending/index.html)


## 2026-08-10
> Im fairly familair with github already, however working on MAC has been a pain for me, but hopefully that will be temporary. For now i editted the sample project to feature the backrooms.
> ![backrooms](./assets/images/backrooms.png)
> [Backrooms](./topics/hello_world/index.html)

















