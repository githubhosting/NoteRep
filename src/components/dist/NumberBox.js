"use strict";
exports.__esModule = true;
exports.NumberBox = void 0;
var react_1 = require("react");
exports.NumberBox = function (_a) {
    var num = _a.num, unit = _a.unit, flip = _a.flip;
    return (react_1["default"].createElement("div", { className: "mt-4 flex flex-col items-center px-2" },
        react_1["default"].createElement("div", { className: " relative mt-4 flex h-32 w-32 flex-col items-center justify-center rounded-lg  bg-transparent text-2xl md:text-4xl " },
            react_1["default"].createElement("div", { className: "h-full w-full rounded-t-lg rounded-b-lg bg-[#343650]" }),
            react_1["default"].createElement("div", { className: "font-redhat absolute z-10 font-mono text-5xl font-bold text-rose-500 md:text-7xl " }, num),
            react_1["default"].createElement("div", { className: " h-full w-full rounded-b-lg rounded-t-lg bg-[#2c2e3f]" }),
            react_1["default"].createElement("div", { className: "z-5  absolute top-0 h-1/2  w-full rounded-t-lg " + (flip ? 'animate-flip bg-rose-200' : 'bg-transparent') }),
            react_1["default"].createElement("div", { className: "absolute -right-1 top-[60px] h-[12px] w-[12px] rounded-full bg-[#1e1f29]" }),
            react_1["default"].createElement("div", { className: "absolute -left-1 top-60px] h-[12px] w-[12px] rounded-full bg-[#1e1f29]" })),
        react_1["default"].createElement("p", { className: "mt-3 text-lg font-semibold text-rose-200  md:text-2xl " }, unit)));
};
