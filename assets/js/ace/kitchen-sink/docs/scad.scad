// ace can highlight scad!
module Element(xpos, ypos, zpos)***REMOVED***
	translate([xpos,ypos,zpos])***REMOVED***
		union()***REMOVED***
			cube([10,10,4],true);
			cylinder(10,15,5);
			translate([0,0,10])sphere(5);
		***REMOVED***
	***REMOVED***
***REMOVED***

union()***REMOVED***
	for(i=[0:30])***REMOVED***
		# Element(0,0,0);
		Element(15*i,0,0);
	***REMOVED***
***REMOVED***

for (i = [3, 5, 7, 11])***REMOVED***
	rotate([i*10,0,0])scale([1,1,i])cube(10);
***REMOVED***