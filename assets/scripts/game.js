
//Physics Variable
var b2Vec2          = Box2D.Common.Math.b2Vec2,
    b2BodyDef       = Box2D.Dynamics.b2BodyDef,
    b2Body          = Box2D.Dynamics.b2Body,
    b2FixtureDef    = Box2D.Dynamics.b2FixtureDef,
    b2Fixture       = Box2D.Dynamics.b2Fixture,
    b2World         = Box2D.Dynamics.b2World,
    b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape   = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw     = Box2D.Dynamics.b2DebugDraw,
    b2RevoluteJoinDef   = Box2D.Dynamics.Joints.b2RevoluteJoinDef;
//end Physics variable

//Box2D Physics code
  //creamos el mundo
  var world = undefined;
  var scale = 30;
  var timeStep = 1/60;
  //como sugiere el manual el conteo de iteraciones es:
  //8 por velocity y 3 por position
  var velocityIterations = 8;
  var positionIterations = 3;

  var initPhysics = function(){
    //configuramos el mundo para que pueda hacer simulaciones fisicas
    var gravity = new b2Vec2(0,9.8); //9.8 meters per square
    var allowSleep = true; //allow object rest when fall over the floor as sleep
    world = new b2World(gravity, allowSleep = true);
    
    createfloorBody();
    createCircleBody();
    createRectangleBody();

    setupDebugDraw();//ejecutar dibujos de prueba
  };

  //crear un cuerpo rigido
  var createfloorBody = function() {
    var bodyDef = new b2BodyDef;
    bodyDef.position.x = 640/2/scale;
    bodyDef.position.y = 450/2/scale;
    bodyDef.type = b2Body.b2_staticBody;

    //configuramos las caracteristicas
    var fixtureDef          = new b2FixtureDef
    fixtureDef.density      = 1.0;
    fixtureDef.restitution  = 0.5;
    fixtureDef.friction     = 0.2;
    fixtureDef.shape        = new b2PolygonShape;
    fixtureDef.shape.SetAsBox(320/scale, 10/scale);

    //crear cuerpo
    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
    console.log("createfloorBody done");//verificar que se ejecuto
  }

  var createCircleBody = function() {
    var bodyDef         = new b2BodyDef;
    bodyDef.type        = b2Body.b2_dynamicBody;
    bodyDef.position.x  = 110/scale;
    bodyDef.position.y  = 20/scale;

    //creo caracteristicas
    var fixtureDef          = new b2FixtureDef;
    fixtureDef.density      = 2;
    fixtureDef.restitution  = 0.4;
    fixtureDef.friction     = 0.4;
    fixtureDef.shape = new b2CircleShape(30/scale);

    //agregar cuerpo al mundo
    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
  }

  var createRectangleBody = function() {
    var bodyDef = new b2BodyDef;
    bodyDef.position.x = 320/scale;
    bodyDef.position.y = 50/scale;
    bodyDef.type = b2Body.b2_dynamicBody;

    //configuramos las caracteristicas
    var fixtureDef          = new b2FixtureDef
    fixtureDef.density      = 1.0;
    fixtureDef.restitution  = 0.5;
    fixtureDef.friction     = 0.2;
    fixtureDef.shape        = new b2PolygonShape;
    fixtureDef.shape.SetAsBox(50/scale, 50/scale);

    //crear cuerpo
    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
  }

  //animando el mundo
  var counter = undefined;
  var animate = function() {
    //stablecer paso de tiempo y velocidad de iteraciones
    world.Step(timeStep, velocityIterations, positionIterations);
    world.ClearForces();
    //decirle al mundo que dubuje los datos que hay en debug
    world.DrawDebugData();
    /*counter ++;
    console.log(counter)
    */
    setTimeout(animate, timeStep);
  }

  setTimeout(animate, timeStep);

  var context = undefined;
  //metodo de dibujo para pruebas
  var setupDebugDraw = function() {
    context = document.getElementById("canvastest").getContext("2d");
    var debugDraw = new b2DebugDraw();
    //usamos el contexto para dibujar pantalla de pruebas
    debugDraw.SetSprite(context);
    debugDraw.SetDrawScale(scale);//establecer la escala de dibujo
    debugDraw.SetFillAlpha(0.3); //transparencia para los objetos
    debugDraw.SetLineThickness(1.0); //grosor de lineas
    //mostrar todas las figuras y uniones
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_joinBit);
    //pasar el metodo de dibujo a nuestro mundo fisico
    world.SetDebugDraw(debugDraw);
  }
//End Box2D Physics Code

var setupCanvas = function() {
  //configuracion del canvas
  var canvas = document.getElementById("game-canvas");
  console.log(canvas);
  canvas.width  = 640; //window.innerWidth;
  canvas.height = 450; //window.innerHeight;
  ctx   =   canvas.getContext('2d');
  console.log("the canvas is running");
}//fin configuracion del canvas

runGame = function() {
  setupCanvas();
  initPhysics();
  animate();
}//fin runGame

$(document).ready(runGame);