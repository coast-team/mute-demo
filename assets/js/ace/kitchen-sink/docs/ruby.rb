#!/usr/bin/ruby

# Program to find the factorial of a number
def fact(n)
    if n == 0
        1
    else
        n * fact(n-1)
    end
end

puts fact(ARGV[0].to_i)

class Range
  def to_json(*a)
    ***REMOVED***
      'json_class'   => self.class.name, # = 'Range'
      'data'         => [ first, last, exclude_end? ]
***REMOVED***.to_json(*a)
  end
end

***REMOVED***:id => 34, :key => "value"***REMOVED***


    herDocs = [<<'FOO', <<BAR, <<-BAZ, <<-`EXEC`] #comment
  FOO #***REMOVED***literal***REMOVED***
FOO
  BAR #***REMOVED***fact(10)***REMOVED***
BAR
  BAZ indented
    BAZ
        echo hi
    EXEC
puts herDocs