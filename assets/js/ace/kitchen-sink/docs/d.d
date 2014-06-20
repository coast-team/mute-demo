#!/usr/bin/env rdmd
// Computes average line length for standard input.
import std.stdio;

void main() ***REMOVED***
    ulong lines = 0;
    double sumLength = 0;
    foreach (line; stdin.byLine()) ***REMOVED***
        ++lines;
        sumLength += line.length;
***REMOVED***
    writeln("Average line length: ",
        lines ? sumLength / lines : 0);
***REMOVED***