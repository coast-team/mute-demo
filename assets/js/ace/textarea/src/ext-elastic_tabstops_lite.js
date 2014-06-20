/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

__ace_shadowed__.define('ace/ext/elastic_tabstops_lite', ['require', 'exports', 'module' , 'ace/editor', 'ace/config'], function(require, exports, module) ***REMOVED***


var ElasticTabstopsLite = function(editor) ***REMOVED***
    this.$editor = editor;
    var self = this;
    var changedRows = [];
    var recordChanges = false;
    this.onAfterExec = function() ***REMOVED***
        recordChanges = false;
        self.processRows(changedRows);
        changedRows = [];
***REMOVED***;
    this.onExec = function() ***REMOVED***
        recordChanges = true;
***REMOVED***;
    this.onChange = function(e) ***REMOVED***
        var range = e.data.range
        if (recordChanges) ***REMOVED***
            if (changedRows.indexOf(range.start.row) == -1)
                changedRows.push(range.start.row);
            if (range.end.row != range.start.row)
                changedRows.push(range.end.row);
    ***REMOVED***
***REMOVED***;
***REMOVED***;

(function() ***REMOVED***
    this.processRows = function(rows) ***REMOVED***
        this.$inChange = true;
        var checkedRows = [];

        for (var r = 0, rowCount = rows.length; r < rowCount; r++) ***REMOVED***
            var row = rows[r];

            if (checkedRows.indexOf(row) > -1)
                continue;

            var cellWidthObj = this.$findCellWidthsForBlock(row);
            var cellWidths = this.$setBlockCellWidthsToMax(cellWidthObj.cellWidths);
            var rowIndex = cellWidthObj.firstRow;

            for (var w = 0, l = cellWidths.length; w < l; w++) ***REMOVED***
                var widths = cellWidths[w];
                checkedRows.push(rowIndex);
                this.$adjustRow(rowIndex, widths);
                rowIndex++;
        ***REMOVED***
    ***REMOVED***
        this.$inChange = false;
***REMOVED***;

    this.$findCellWidthsForBlock = function(row) ***REMOVED***
        var cellWidths = [], widths;
        var rowIter = row;
        while (rowIter >= 0) ***REMOVED***
            widths = this.$cellWidthsForRow(rowIter);
            if (widths.length == 0)
                break;

            cellWidths.unshift(widths);
            rowIter--;
    ***REMOVED***
        var firstRow = rowIter + 1;
        rowIter = row;
        var numRows = this.$editor.session.getLength();

        while (rowIter < numRows - 1) ***REMOVED***
            rowIter++;

            widths = this.$cellWidthsForRow(rowIter);
            if (widths.length == 0)
                break;

            cellWidths.push(widths);
    ***REMOVED***

        return ***REMOVED*** cellWidths: cellWidths, firstRow: firstRow ***REMOVED***;
***REMOVED***;

    this.$cellWidthsForRow = function(row) ***REMOVED***
        var selectionColumns = this.$selectionColumnsForRow(row);

        var tabs = [-1].concat(this.$tabsForRow(row));
        var widths = tabs.map(function(el) ***REMOVED*** return 0; ***REMOVED*** ).slice(1);
        var line = this.$editor.session.getLine(row);

        for (var i = 0, len = tabs.length - 1; i < len; i++) ***REMOVED***
            var leftEdge = tabs[i]+1;
            var rightEdge = tabs[i+1];

            var rightmostSelection = this.$rightmostSelectionInCell(selectionColumns, rightEdge);
            var cell = line.substring(leftEdge, rightEdge);
            widths[i] = Math.max(cell.replace(/\s+$/g,'').length, rightmostSelection - leftEdge);
    ***REMOVED***

        return widths;
***REMOVED***;

    this.$selectionColumnsForRow = function(row) ***REMOVED***
        var selections = [], cursor = this.$editor.getCursorPosition();
        if (this.$editor.session.getSelection().isEmpty()) ***REMOVED***
            if (row == cursor.row)
                selections.push(cursor.column);
    ***REMOVED***

        return selections;
***REMOVED***;

    this.$setBlockCellWidthsToMax = function(cellWidths) ***REMOVED***
        var startingNewBlock = true, blockStartRow, blockEndRow, maxWidth;
        var columnInfo = this.$izip_longest(cellWidths);

        for (var c = 0, l = columnInfo.length; c < l; c++) ***REMOVED***
            var column = columnInfo[c];
            if (!column.push) ***REMOVED***
                console.error(column);
                continue;
        ***REMOVED***
            column.push(NaN);

            for (var r = 0, s = column.length; r < s; r++) ***REMOVED***
                var width = column[r];
                if (startingNewBlock) ***REMOVED***
                    blockStartRow = r;
                    maxWidth = 0;
                    startingNewBlock = false;
            ***REMOVED***
                if (isNaN(width)) ***REMOVED***
                    blockEndRow = r;

                    for (var j = blockStartRow; j < blockEndRow; j++) ***REMOVED***
                        cellWidths[j][c] = maxWidth;
                ***REMOVED***
                    startingNewBlock = true;
            ***REMOVED***

                maxWidth = Math.max(maxWidth, width);
        ***REMOVED***
    ***REMOVED***

        return cellWidths;
***REMOVED***;

    this.$rightmostSelectionInCell = function(selectionColumns, cellRightEdge) ***REMOVED***
        var rightmost = 0;

        if (selectionColumns.length) ***REMOVED***
            var lengths = [];
            for (var s = 0, length = selectionColumns.length; s < length; s++) ***REMOVED***
                if (selectionColumns[s] <= cellRightEdge)
                    lengths.push(s);
                else
                    lengths.push(0);
        ***REMOVED***
            rightmost = Math.max.apply(Math, lengths);
    ***REMOVED***

        return rightmost;
***REMOVED***;

    this.$tabsForRow = function(row) ***REMOVED***
        var rowTabs = [], line = this.$editor.session.getLine(row),
            re = /\t/g, match;

        while ((match = re.exec(line)) != null) ***REMOVED***
            rowTabs.push(match.index);
    ***REMOVED***

        return rowTabs;
***REMOVED***;

    this.$adjustRow = function(row, widths) ***REMOVED***
        var rowTabs = this.$tabsForRow(row);

        if (rowTabs.length == 0)
            return;

        var bias = 0, location = -1;
        var expandedSet = this.$izip(widths, rowTabs);

        for (var i = 0, l = expandedSet.length; i < l; i++) ***REMOVED***
            var w = expandedSet[i][0], it = expandedSet[i][1];
            location += 1 + w;
            it += bias;
            var difference = location - it;

            if (difference == 0)
                continue;

            var partialLine = this.$editor.session.getLine(row).substr(0, it );
            var strippedPartialLine = partialLine.replace(/\s*$/g, "");
            var ispaces = partialLine.length - strippedPartialLine.length;

            if (difference > 0) ***REMOVED***
                this.$editor.session.getDocument().insertInLine(***REMOVED***row: row, column: it + 1***REMOVED***, Array(difference + 1).join(" ") + "\t");
                this.$editor.session.getDocument().removeInLine(row, it, it + 1);

                bias += difference;
        ***REMOVED***

            if (difference < 0 && ispaces >= -difference) ***REMOVED***
                this.$editor.session.getDocument().removeInLine(row, it + difference, it);
                bias += difference;
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
    this.$izip_longest = function(iterables) ***REMOVED***
        if (!iterables[0])
            return [];
        var longest = iterables[0].length;
        var iterablesLength = iterables.length;

        for (var i = 1; i < iterablesLength; i++) ***REMOVED***
            var iLength = iterables[i].length;
            if (iLength > longest)
                longest = iLength;
    ***REMOVED***

        var expandedSet = [];

        for (var l = 0; l < longest; l++) ***REMOVED***
            var set = [];
            for (var i = 0; i < iterablesLength; i++) ***REMOVED***
                if (iterables[i][l] === "")
                    set.push(NaN);
                else
                    set.push(iterables[i][l]);
        ***REMOVED***

            expandedSet.push(set);
    ***REMOVED***


        return expandedSet;
***REMOVED***;
    this.$izip = function(widths, tabs) ***REMOVED***
        var size = widths.length >= tabs.length ? tabs.length : widths.length;

        var expandedSet = [];
        for (var i = 0; i < size; i++) ***REMOVED***
            var set = [ widths[i], tabs[i] ];
            expandedSet.push(set);
    ***REMOVED***
        return expandedSet;
***REMOVED***;

***REMOVED***).call(ElasticTabstopsLite.prototype);

exports.ElasticTabstopsLite = ElasticTabstopsLite;

var Editor = require("../editor").Editor;
require("../config").defineOptions(Editor.prototype, "editor", ***REMOVED***
    useElasticTabstops: ***REMOVED***
        set: function(val) ***REMOVED***
            if (val) ***REMOVED***
                if (!this.elasticTabstops)
                    this.elasticTabstops = new ElasticTabstopsLite(this);
                this.commands.on("afterExec", this.elasticTabstops.onAfterExec);
                this.commands.on("exec", this.elasticTabstops.onExec);
                this.on("change", this.elasticTabstops.onChange);
        ***REMOVED*** else if (this.elasticTabstops) ***REMOVED***
                this.commands.removeListener("afterExec", this.elasticTabstops.onAfterExec);
                this.commands.removeListener("exec", this.elasticTabstops.onExec);
                this.removeListener("change", this.elasticTabstops.onChange);
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***);

***REMOVED***);