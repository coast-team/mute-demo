#NoEnv
SetBatchLines -1

CoordMode Mouse, Screen
OnExit GuiClose

zoom := 9

computeSize()***REMOVED***
	global as_x
	as_x := Round(ws_x/zoom/2 - 0.5)
	if (zoom>1) ***REMOVED***
		pix := Round(zoom)
	***REMOVED*** ele ***REMOVED***
		pix := 1
	***REMOVED***
    ToolTip Message %as_x% %zoom% %ws_x% %hws_x% 
***REMOVED***

hdc_frame := DllCall("GetDC", UInt, MagnifierID)

; comment
DrawCross(byRef x="", rX,rY,z, dc)***REMOVED***
        ;specify the style, thickness and color of the cross lines
    h_pen := DllCall( "gdi32.dll\CreatePen", Int, 0, Int, 1, UInt, 0x0000FF)
***REMOVED***

;Ctrl ^; Shift +; Win #; Alt !
^NumPadAdd::
^WheelUp::   
^;::   ;comment
    If(zoom < ws_x and ( A_ThisHotKey = "^WheelUp" or A_ThisHotKey ="^NumPadAdd") )
		zoom *= 1.189207115         ; sqrt(sqrt(2))
	Gosub,setZoom
return
