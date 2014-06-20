\name***REMOVED***picker***REMOVED***
\alias***REMOVED***picker***REMOVED***
\title***REMOVED***Create a picker control***REMOVED***
\description***REMOVED***
  Create a picker control to enable manipulation of plot variables based on a set of fixed choices.
***REMOVED***

\usage***REMOVED***
picker(..., initial = NULL, label = NULL)
***REMOVED***


\arguments***REMOVED***
  \item***REMOVED***\dots***REMOVED******REMOVED***
    Arguments containing objects to be presented as choices for the picker (or a list containing the choices). If an element is named then the name is used to display it within the picker. If an element is not named then it is displayed within the picker using \code***REMOVED***\link***REMOVED***as.character***REMOVED******REMOVED***. 
***REMOVED***
  \item***REMOVED***initial***REMOVED******REMOVED***
    Initial value for picker. Value must be present in the list of choices specified. If not specified defaults to the first choice.
***REMOVED***
  \item***REMOVED***label***REMOVED******REMOVED***
    Display label for picker. Defaults to the variable name if not specified.
***REMOVED***
***REMOVED***

\value***REMOVED***
  An object of class "manipulator.picker" which can be passed to the \code***REMOVED***\link***REMOVED***manipulate***REMOVED******REMOVED*** function.
***REMOVED***

\seealso***REMOVED***
\code***REMOVED***\link***REMOVED***manipulate***REMOVED******REMOVED***, \code***REMOVED***\link***REMOVED***slider***REMOVED******REMOVED***, \code***REMOVED***\link***REMOVED***checkbox***REMOVED******REMOVED***, \code***REMOVED***\link***REMOVED***button***REMOVED******REMOVED***
***REMOVED***


\examples***REMOVED***
\dontrun***REMOVED***

## Filtering data with a picker
manipulate(
  barplot(as.matrix(longley[,factor]), 
          beside = TRUE, main = factor),
  factor = picker("GNP", "Unemployed", "Employed"))

## Create a picker with labels
manipulate(
  plot(pressure, type = type), 
  type = picker("points" = "p", "line" = "l", "step" = "s"))
  
## Picker with groups
manipulate(
  barplot(as.matrix(mtcars[group,"mpg"]), beside=TRUE),
  group = picker("Group 1" = 1:11, 
                 "Group 2" = 12:22, 
                 "Group 3" = 23:32))

## Histogram w/ picker to select type
require(lattice)
require(stats)
manipulate(
  histogram(~ height | voice.part, 
            data = singer, type = type),
  type = picker("percent", "count", "density"))

***REMOVED***
***REMOVED***