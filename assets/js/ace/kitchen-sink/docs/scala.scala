// http://www.scala-lang.org/node/54

package examples.actors

import scala.actors.Actor
import scala.actors.Actor._

abstract class PingMessage
case object Start extends PingMessage
case object SendPing extends PingMessage
case object Pong extends PingMessage

abstract class PongMessage
case object Ping extends PongMessage
case object Stop extends PongMessage

object pingpong extends Application ***REMOVED***
  val pong = new Pong
  val ping = new Ping(100000, pong)
  ping.start
  pong.start
  ping ! Start
***REMOVED***

class Ping(count: Int, pong: Actor) extends Actor ***REMOVED***
  def act() ***REMOVED***
    println("Ping: Initializing with count "+count+": "+pong)
    var pingsLeft = count
    loop ***REMOVED***
      react ***REMOVED***
        case Start =>
          println("Ping: starting.")
          pong ! Ping
          pingsLeft = pingsLeft - 1
        case SendPing =>
          pong ! Ping
          pingsLeft = pingsLeft - 1
        case Pong =>
          if (pingsLeft % 1000 == 0)
            println("Ping: pong from: "+sender)
          if (pingsLeft > 0)
            self ! SendPing
          else ***REMOVED***
            println("Ping: Stop.")
            pong ! Stop
            exit('stop)
      ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***

class Pong extends Actor ***REMOVED***
  def act() ***REMOVED***
    var pongCount = 0
    loop ***REMOVED***
      react ***REMOVED***
        case Ping =>
          if (pongCount % 1000 == 0)
            println("Pong: ping "+pongCount+" from "+sender)
          sender ! Pong
          pongCount = pongCount + 1
        case Stop =>
          println("Pong: Stop.")
          exit('stop)
  ***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***