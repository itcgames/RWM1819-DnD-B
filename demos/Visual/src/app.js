// Author: John O'Grady
/**
 * Entry point
 */

var mainLoop = {};

function main()
{
  const main = new Main();
  mainLoop.main = main;
  main.init();
  main.update();
}