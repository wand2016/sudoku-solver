"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var buffers, _a, _b, chunk, e_1_1, buffer, inputText, board, current, depth, result;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                buffers = [];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, 7, 12]);
                _a = __asyncValues(process.stdin);
                _d.label = 2;
            case 2: return [4 /*yield*/, _a.next()];
            case 3:
                if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                chunk = _b.value;
                buffers.push(chunk);
                _d.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _d.trys.push([7, , 10, 11]);
                if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _c.call(_a)];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12:
                buffer = Buffer.concat(buffers);
                inputText = buffer.toString();
                console.time("sudoku");
                board = Board.fromString(inputText);
                console.log("input:");
                console.log(board.toString());
                current = board.clone();
                for (depth = 1; depth <= 10; ++depth) {
                    console.log("***** depth = " + depth + " ****");
                    result = solve(current, depth);
                    if (result.type === "solved") {
                        console.log("solved!");
                        console.log(result.board.toString());
                        console.timeEnd("sudoku");
                        return [2 /*return*/];
                    }
                    if (result.type === "impossible") {
                        console.log("cannot to solve");
                        console.timeEnd("sudoku");
                        return [2 /*return*/];
                    }
                    // より深く仮置きしないと解けない場合
                    // その場合でも、「ここに置くと詰む」という知識は得られたので、反映する
                    if (result.type === "more_depth_needed") {
                        current = result.board;
                        console.log(current.toString());
                        continue;
                    }
                }
                console.log("more depth is needed.");
                return [2 /*return*/];
        }
    });
}); })();
var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var digitBits = [
    1 << 0,
    1 << 1,
    1 << 2,
    1 << 3,
    1 << 4,
    1 << 5,
    1 << 6,
    1 << 7,
    1 << 8,
];
var cellCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var blockCoords = [0, 1, 2];
var Cell = /** @class */ (function () {
    function Cell(x, y, possibleDigits) {
        this.x = x;
        this.y = y;
        this.possibleDigits = possibleDigits;
    }
    Cell.prototype.isFixed = function () {
        return digitBits.includes(this.possibleDigits);
    };
    Cell.prototype.fixedDigitBit = function () {
        if (!this.isFixed()) {
            throw new Error("not fixed yet");
        }
        return this.possibleDigits;
    };
    Cell.prototype.isImpossible = function () {
        return this.possibleDigits === 0;
    };
    Cell.prototype.getPossibleDigitBits = function () {
        var _this = this;
        return digitBits
            .map(function (digitBit) { return digitBit & _this.possibleDigits; })
            .filter(function (extracted) { return extracted !== 0; });
    };
    Cell.prototype.canBe = function (bit) {
        return (this.possibleDigits & bit) !== 0;
    };
    Cell.prototype.removeBit = function (bit) {
        this.possibleDigits &= ~bit;
    };
    Cell.prototype.fixBit = function (bit) {
        this.possibleDigits = bit;
    };
    Cell.prototype.clone = function () {
        return new Cell(this.x, this.y, this.possibleDigits);
    };
    Cell.equals = function (a, b) {
        return a.x === b.x && a.y === b.y && a.possibleDigits === b.possibleDigits;
    };
    Cell.prototype.toString = function () {
        if (this.isImpossible()) {
            return "x";
        }
        if (this.isFixed()) {
            return Math.floor(Math.log2(this.fixedDigitBit()) + 1).toString();
        }
        if (this.possibleDigits === 511) {
            return "_";
        }
        // return "?";
        return "{" + __spreadArray([], __read(this.getPossibleDigitBits().map(function (bit) {
            return Math.floor(Math.log2(bit) + 1);
        }))).join("") + "}";
    };
    Cell.fromChar = function (x, y, ch) {
        if (ch === "_") {
            return new Cell(x, y, 511);
        }
        if (/^[1-9]$/.test(ch)) {
            return new Cell(x, y, 1 << (Number(ch) - 1));
        }
        throw new Error("invalid ch: " + ch);
    };
    return Cell;
}());
var Board = /** @class */ (function () {
    function Board(cells) {
        this.cells = cells;
        this.blocksMemo = null;
        this.rowMemo = Array(9);
        this.colMemo = Array(9);
        this.blockMemo = Array(9);
        this.sameRowMemo = Array(9);
        this.sameColMemo = Array(9);
        this.sameBlockMemo = Array(9);
    }
    Board.prototype.clone = function () {
        return new Board(this.cells.map(function (cell) { return cell.clone(); }));
    };
    Board.prototype.toString = function () {
        var e_2, _a, e_3, _b;
        var ret = "";
        try {
            for (var cellCoords_1 = __values(cellCoords), cellCoords_1_1 = cellCoords_1.next(); !cellCoords_1_1.done; cellCoords_1_1 = cellCoords_1.next()) {
                var y = cellCoords_1_1.value;
                try {
                    for (var cellCoords_2 = (e_3 = void 0, __values(cellCoords)), cellCoords_2_1 = cellCoords_2.next(); !cellCoords_2_1.done; cellCoords_2_1 = cellCoords_2.next()) {
                        var x = cellCoords_2_1.value;
                        ret += this.at(x, y).toString();
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (cellCoords_2_1 && !cellCoords_2_1.done && (_b = cellCoords_2.return)) _b.call(cellCoords_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                ret += "\n";
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (cellCoords_1_1 && !cellCoords_1_1.done && (_a = cellCoords_1.return)) _a.call(cellCoords_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    /**
     * 確定したセルを返す
     */
    Board.prototype.fixed = function () {
        return this.cells.filter(function (cell) { return cell.isFixed(); });
    };
    /**
     * もう少しで確定しそうなセルを返す
     */
    Board.prototype.almostFixed = function () {
        var notFixed = this.cells.filter(function (cell) { return !cell.isFixed(); });
        // at least 2
        var minimumPossibilities = Math.min.apply(Math, __spreadArray([], __read(notFixed.map(function (cell) { return cell.getPossibleDigitBits().length; }))));
        return notFixed.filter(function (cell) { return cell.getPossibleDigitBits().length === minimumPossibilities; });
    };
    Board.prototype.abduction = function (x, y, bit) {
        var ret = this.clone();
        ret.at(x, y).fixBit(bit);
        return ret;
    };
    Board.prototype.rows = function (y) {
        return (this.rowMemo[y] ||
            (this.rowMemo[y] = this.cells.filter(function (cell) { return cell.y === y; })));
    };
    Board.prototype.cols = function (x) {
        return (this.colMemo[x] ||
            (this.colMemo[x] = this.cells.filter(function (cell) { return cell.x === x; })));
    };
    /**
     * 座標指定してセル取得
     */
    Board.prototype.at = function (x, y) {
        return this.rows(y)[x];
    };
    /**
     * ブロックを構成するセルのコレクションを返す
     */
    Board.prototype.block = function (bx, by) {
        return (this.blockMemo[by * 3 + bx] ||
            (this.blockMemo[by * 3 + bx] = this.cells
                .filter(function (cell) { return Math.floor(cell.x / 3) === bx; })
                .filter(function (cell) { return Math.floor(cell.y / 3) === by; })));
    };
    /**
     * ブロックのコレクション
     */
    Board.prototype.blocks = function () {
        var e_4, _a, e_5, _b;
        if (this.blocksMemo) {
            return this.blocksMemo;
        }
        var ret = [];
        try {
            for (var blockCoords_1 = __values(blockCoords), blockCoords_1_1 = blockCoords_1.next(); !blockCoords_1_1.done; blockCoords_1_1 = blockCoords_1.next()) {
                var by = blockCoords_1_1.value;
                try {
                    for (var blockCoords_2 = (e_5 = void 0, __values(blockCoords)), blockCoords_2_1 = blockCoords_2.next(); !blockCoords_2_1.done; blockCoords_2_1 = blockCoords_2.next()) {
                        var bx = blockCoords_2_1.value;
                        ret.push(this.block(bx, by));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (blockCoords_2_1 && !blockCoords_2_1.done && (_b = blockCoords_2.return)) _b.call(blockCoords_2);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (blockCoords_1_1 && !blockCoords_1_1.done && (_a = blockCoords_1.return)) _a.call(blockCoords_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return (this.blocksMemo = ret);
    };
    /**
     * あるセルと同じ行の他のセル
     */
    Board.prototype.sameRow = function (ref) {
        return (this.sameRowMemo[ref.y * 9 + ref.x] ||
            (this.sameRowMemo[ref.y * 9 + ref.x] = this.rows(ref.y).filter(function (cell) { return cell.x !== ref.x; })));
    };
    /**
     * あるセルと同じ列の他のセル
     */
    Board.prototype.sameCol = function (ref) {
        return (this.sameColMemo[ref.y * 9 + ref.x] ||
            (this.sameColMemo[ref.y * 9 + ref.x] = this.cols(ref.x).filter(function (cell) { return cell.y !== ref.y; })));
    };
    /**
     * あるセルと同じブロックの他のセル
     */
    Board.prototype.sameBlock = function (ref) {
        var memo = this.sameBlockMemo[ref.y * 9 + ref.x];
        if (memo) {
            return memo;
        }
        // 3で割って量子化
        var bx = Math.floor(ref.x / 3);
        var by = Math.floor(ref.y / 3);
        return (this.sameBlockMemo[ref.y * 9 + ref.x] = this.block(bx, by).filter(function (cell) { return cell.x !== ref.x || cell.y !== ref.y; }));
    };
    /**
     * 盤面を進め、セルのとりうる数字の候補を絞り込む
     */
    Board.prototype.next = function () {
        var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e, e_11, _f;
        var ret = this.clone();
        try {
            // 確定しているセルに対して
            for (var _g = __values(this.fixed()), _h = _g.next(); !_h.done; _h = _g.next()) {
                var fixedCell = _h.value;
                var fixedDigitBit = fixedCell.fixedDigitBit();
                try {
                    // 同じ行、同じ列、同じブロックのセル消込
                    for (var _j = (e_7 = void 0, __values(ret.sameRow(fixedCell))), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var cell = _k.value;
                        cell.removeBit(fixedDigitBit);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                try {
                    for (var _l = (e_8 = void 0, __values(ret.sameCol(fixedCell))), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var cell = _m.value;
                        cell.removeBit(fixedDigitBit);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                try {
                    for (var _o = (e_9 = void 0, __values(ret.sameBlock(fixedCell))), _p = _o.next(); !_p.done; _p = _o.next()) {
                        var cell = _p.value;
                        cell.removeBit(fixedDigitBit);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_p && !_p.done && (_d = _o.return)) _d.call(_o);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
            }
            finally { if (e_6) throw e_6.error; }
        }
        try {
            // ブロック内である数字になりうるセルがただ一つ存在すれば、それは確定してよい
            //
            // ________1
            // ____1____
            // _23______
            // ...
            //
            // こういうケースで
            //
            // ________1
            // ____1____
            // 123______
            // ...
            //
            // を確定してよい
            //
            for (var _q = __values(ret.blocks()), _r = _q.next(); !_r.done; _r = _q.next()) {
                var block = _r.value;
                var _loop_1 = function (digitBit) {
                    var candidates = block.filter(function (cell) { return cell.canBe(digitBit); });
                    if (candidates.length === 1) {
                        candidates[0].fixBit(digitBit);
                    }
                };
                try {
                    for (var digitBits_1 = (e_11 = void 0, __values(digitBits)), digitBits_1_1 = digitBits_1.next(); !digitBits_1_1.done; digitBits_1_1 = digitBits_1.next()) {
                        var digitBit = digitBits_1_1.value;
                        _loop_1(digitBit);
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (digitBits_1_1 && !digitBits_1_1.done && (_f = digitBits_1.return)) _f.call(digitBits_1);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return ret;
    };
    Board.prototype.isSolved = function () {
        return this.cells.every(function (cell) { return cell.isFixed(); });
    };
    Board.prototype.isImpossible = function () {
        return this.cells.some(function (cell) { return cell.isImpossible(); });
    };
    Board.equals = function (a, b) {
        return a.cells.every(function (cellA, i) {
            var cellB = b.cells[i];
            return Cell.equals(cellA, cellB);
        });
    };
    Board.fromString = function (string) {
        var e_12, _a, e_13, _b;
        var cells = [];
        var lines = string.split("\n");
        try {
            for (var cellCoords_3 = __values(cellCoords), cellCoords_3_1 = cellCoords_3.next(); !cellCoords_3_1.done; cellCoords_3_1 = cellCoords_3.next()) {
                var y = cellCoords_3_1.value;
                try {
                    for (var cellCoords_4 = (e_13 = void 0, __values(cellCoords)), cellCoords_4_1 = cellCoords_4.next(); !cellCoords_4_1.done; cellCoords_4_1 = cellCoords_4.next()) {
                        var x = cellCoords_4_1.value;
                        cells.push(Cell.fromChar(x, y, lines[y][x]));
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (cellCoords_4_1 && !cellCoords_4_1.done && (_b = cellCoords_4.return)) _b.call(cellCoords_4);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (cellCoords_3_1 && !cellCoords_3_1.done && (_a = cellCoords_3.return)) _a.call(cellCoords_3);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return new Board(cells);
    };
    return Board;
}());
function solve(board, maxDepth, depth) {
    var e_14, _a, e_15, _b;
    if (maxDepth === void 0) { maxDepth = 3; }
    if (depth === void 0) { depth = 1; }
    var current = board.clone();
    OUTER: while (true) {
        var result = solveShallow(current);
        if (result.type === "impossible") {
            return result;
        }
        if (result.type === "solved") {
            return result;
        }
        // abduction_needed
        // 1つ仮置きして解なしになれば、その仮置きが間違っているということ
        // 深さ最大なら脱出
        if (depth === maxDepth) {
            return {
                type: "too_deep",
            };
        }
        current = result.board;
        var almostFixed = current.almostFixed();
        try {
            for (var almostFixed_1 = (e_14 = void 0, __values(almostFixed)), almostFixed_1_1 = almostFixed_1.next(); !almostFixed_1_1.done; almostFixed_1_1 = almostFixed_1.next()) {
                var cellToFix = almostFixed_1_1.value;
                try {
                    for (var _c = (e_15 = void 0, __values(cellToFix.getPossibleDigitBits())), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var possibleBit = _d.value;
                        // 仮置きした問題を解く
                        var abductionResult = solve(current.abduction(cellToFix.x, cellToFix.y, possibleBit), maxDepth, depth + 1);
                        // 解けちゃったらそれはそれでよし
                        if (abductionResult.type === "solved") {
                            return abductionResult;
                        }
                        // 仮置きして解なしになったら、その仮置きを候補から外して仕切り直し
                        if (abductionResult.type === "impossible") {
                            current.at(cellToFix.x, cellToFix.y).removeBit(possibleBit);
                            continue OUTER;
                        }
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (almostFixed_1_1 && !almostFixed_1_1.done && (_a = almostFixed_1.return)) _a.call(almostFixed_1);
            }
            finally { if (e_14) throw e_14.error; }
        }
        // 深さが足りないとここにくる
        return {
            type: "more_depth_needed",
            board: current,
        };
    }
}
function solveShallow(board) {
    var current = board.clone();
    while (true) {
        if (current.isImpossible()) {
            return { type: "impossible" };
        }
        if (current.isSolved()) {
            return { type: "solved", board: current };
        }
        var next = current.next();
        if (Board.equals(current, next)) {
            return { type: "abduction_needed", board: next };
        }
        current = next;
    }
}
