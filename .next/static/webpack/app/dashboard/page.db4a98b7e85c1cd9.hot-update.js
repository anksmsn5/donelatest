"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"e60a32a08a73\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzUyODkiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJlNjBhMzJhMDhhNzNcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/components/DashboardTabs.tsx":
/*!******************************************!*\
  !*** ./app/components/DashboardTabs.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getServerSideProps: function() { return /* binding */ getServerSideProps; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _EvaluationsTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EvaluationsTable */ \"(app-pages-browser)/./app/components/EvaluationsTable.tsx\");\n// components/Tabs.tsx\n\nvar _s = $RefreshSig$();\n\n\nconst DashboardTabs = (param)=>{\n    let { evaluations } = param;\n    _s();\n    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const tabs = [\n        {\n            id: \"Requested\",\n            label: \"Requested\"\n        },\n        {\n            id: \"Accepted\",\n            label: \"Accepted\"\n        },\n        {\n            id: \"Completed\",\n            label: \"Completed\"\n        },\n        {\n            id: \"Declined\",\n            label: \"Declined\"\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col mt-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center items-center space-x-4 border-b pb-2\",\n                children: tabs.map((tab)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"p-2 font-semibold \".concat(activeTab === tab.id ? \"border-b-2 border-blue-500\" : \"\"),\n                        onClick: ()=>setActiveTab(tab.id),\n                        children: tab.label\n                    }, tab.id, false, {\n                        fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_EvaluationsTable__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    data: evaluations[activeTab] || []\n                }, void 0, false, {\n                    fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DashboardTabs, \"mI5V9FR0ng2BwpaSszwTN0gLc+M=\");\n_c = DashboardTabs;\nasync function getServerSideProps(context) {\n    const { playerId } = context.query; // Assuming you pass playerId as a query parameter\n    const responses = await Promise.all([\n        \"Requested\",\n        \"Accepted\",\n        \"Completed\",\n        \"Declined\"\n    ].map((status)=>fetch(\"/api/evaluations?playerId=\".concat(playerId, \"&status=\").concat(status)).then((res)=>{\n            if (!res.ok) {\n                throw new Error(\"Failed to fetch data for status: \".concat(status));\n            }\n            return res.json();\n        })));\n    // Log the responses to check their structure\n    console.log(\"Responses:\", responses);\n    const evaluations = responses.reduce((acc, curr, index)=>{\n        const status = [\n            \"Requested\",\n            \"Accepted\",\n            \"Completed\",\n            \"Declined\"\n        ][index];\n        acc[status] = curr; // Group evaluations by status\n        return acc;\n    }, {});\n    // Log the final evaluations structure\n    console.log(\"Evaluations:\", evaluations);\n    return {\n        props: {\n            evaluations\n        }\n    };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (DashboardTabs);\nvar _c;\n$RefreshReg$(_c, \"DashboardTabs\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL0Rhc2hib2FyZFRhYnMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0JBQXNCOzs7QUFDVztBQUNpQjtBQWtCbEQsTUFBTUUsZ0JBQThDO1FBQUMsRUFBRUMsV0FBVyxFQUFFOztJQUNsRSxNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR0wsK0NBQVFBLENBQVM7SUFFbkQsTUFBTU0sT0FBTztRQUNYO1lBQUVDLElBQUk7WUFBYUMsT0FBTztRQUFZO1FBQ3RDO1lBQUVELElBQUk7WUFBWUMsT0FBTztRQUFXO1FBQ3BDO1lBQUVELElBQUk7WUFBYUMsT0FBTztRQUFZO1FBQ3RDO1lBQUVELElBQUk7WUFBWUMsT0FBTztRQUFXO0tBQ3JDO0lBRUQscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDWkosS0FBS0ssR0FBRyxDQUFDQyxDQUFBQSxvQkFDUiw4REFBQ0M7d0JBRUNILFdBQVcscUJBQThFLE9BQXpETixjQUFjUSxJQUFJTCxFQUFFLEdBQUcsK0JBQStCO3dCQUN0Rk8sU0FBUyxJQUFNVCxhQUFhTyxJQUFJTCxFQUFFO2tDQUVqQ0ssSUFBSUosS0FBSzt1QkFKTEksSUFBSUwsRUFBRTs7Ozs7Ozs7OzswQkFRakIsOERBQUNFO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDVCx5REFBZ0JBO29CQUFDYyxNQUFNWixXQUFXLENBQUNDLFVBQVUsSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQUk1RDtHQTVCTUY7S0FBQUE7QUE2QkMsZUFBZWMsbUJBQW1CQyxPQUFZO0lBQ25ELE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdELFFBQVFFLEtBQUssRUFBRSxrREFBa0Q7SUFFdEYsTUFBTUMsWUFBWSxNQUFNQyxRQUFRQyxHQUFHLENBQ2pDO1FBQUM7UUFBYTtRQUFZO1FBQWE7S0FBVyxDQUFDWCxHQUFHLENBQUNZLENBQUFBLFNBQ3JEQyxNQUFNLDZCQUFnREQsT0FBbkJMLFVBQVMsWUFBaUIsT0FBUEssU0FDbkRFLElBQUksQ0FBQ0MsQ0FBQUE7WUFDSixJQUFJLENBQUNBLElBQUlDLEVBQUUsRUFBRTtnQkFDWCxNQUFNLElBQUlDLE1BQU0sb0NBQTJDLE9BQVBMO1lBQ3REO1lBQ0EsT0FBT0csSUFBSUcsSUFBSTtRQUNqQjtJQUlOLDZDQUE2QztJQUM3Q0MsUUFBUUMsR0FBRyxDQUFDLGNBQWNYO0lBRTFCLE1BQU1qQixjQUFjaUIsVUFBVVksTUFBTSxDQUFDLENBQUNDLEtBQW1DQyxNQUFvQkM7UUFDM0YsTUFBTVosU0FBUztZQUFDO1lBQWE7WUFBWTtZQUFhO1NBQVcsQ0FBQ1ksTUFBTTtRQUN4RUYsR0FBRyxDQUFDVixPQUFPLEdBQUdXLE1BQU0sOEJBQThCO1FBQ2xELE9BQU9EO0lBQ1QsR0FBRyxDQUFDO0lBRUosc0NBQXNDO0lBQ3RDSCxRQUFRQyxHQUFHLENBQUMsZ0JBQWdCNUI7SUFFNUIsT0FBTztRQUNMaUMsT0FBTztZQUFFakM7UUFBWTtJQUN2QjtBQUNGO0FBR0EsK0RBQWVELGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NvbXBvbmVudHMvRGFzaGJvYXJkVGFicy50c3g/NGM1ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb21wb25lbnRzL1RhYnMudHN4XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFdmFsdWF0aW9uc1RhYmxlIGZyb20gJy4vRXZhbHVhdGlvbnNUYWJsZSc7XG5cbmludGVyZmFjZSBFdmFsdWF0aW9uIHtcbiAgaWQ6IG51bWJlcjtcbiAgcmV2aWV3X3RpdGxlOiBzdHJpbmc7XG4gIHByaW1hcnlfdmlkZW9fbGluazogc3RyaW5nO1xuICB2aWRlb19saW5rX3R3bz86IHN0cmluZztcbiAgdmlkZW9fbGlua190aHJlZT86IHN0cmluZztcbiAgdmlkZW9fZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGV2YWx1YXRpb25fc3RhdHVzOiBzdHJpbmc7XG4gIHBheW1lbnRfc3RhdHVzOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIERhc2hib2FyZFRhYnNQcm9wcyB7XG4gIGV2YWx1YXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBFdmFsdWF0aW9uW10+OyAvLyBHcm91cGVkIGJ5IHN0YXR1c1xufVxuXG5jb25zdCBEYXNoYm9hcmRUYWJzOiBSZWFjdC5GQzxEYXNoYm9hcmRUYWJzUHJvcHM+ID0gKHsgZXZhbHVhdGlvbnMgfSkgPT4ge1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG5cbiAgY29uc3QgdGFicyA9IFtcbiAgICB7IGlkOiAnUmVxdWVzdGVkJywgbGFiZWw6ICdSZXF1ZXN0ZWQnIH0sXG4gICAgeyBpZDogJ0FjY2VwdGVkJywgbGFiZWw6ICdBY2NlcHRlZCcgfSxcbiAgICB7IGlkOiAnQ29tcGxldGVkJywgbGFiZWw6ICdDb21wbGV0ZWQnIH0sXG4gICAgeyBpZDogJ0RlY2xpbmVkJywgbGFiZWw6ICdEZWNsaW5lZCcgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtdC00XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHNwYWNlLXgtNCBib3JkZXItYiBwYi0yXCI+XG4gICAgICAgIHt0YWJzLm1hcCh0YWIgPT4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGtleT17dGFiLmlkfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIGZvbnQtc2VtaWJvbGQgJHthY3RpdmVUYWIgPT09IHRhYi5pZCA/ICdib3JkZXItYi0yIGJvcmRlci1ibHVlLTUwMCcgOiAnJ31gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKHRhYi5pZCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RhYi5sYWJlbH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00XCI+XG4gICAgICAgIDxFdmFsdWF0aW9uc1RhYmxlIGRhdGE9e2V2YWx1YXRpb25zW2FjdGl2ZVRhYl0gfHwgW119IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKGNvbnRleHQ6IGFueSkge1xuICBjb25zdCB7IHBsYXllcklkIH0gPSBjb250ZXh0LnF1ZXJ5OyAvLyBBc3N1bWluZyB5b3UgcGFzcyBwbGF5ZXJJZCBhcyBhIHF1ZXJ5IHBhcmFtZXRlclxuXG4gIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIFsnUmVxdWVzdGVkJywgJ0FjY2VwdGVkJywgJ0NvbXBsZXRlZCcsICdEZWNsaW5lZCddLm1hcChzdGF0dXMgPT5cbiAgICAgIGZldGNoKGAvYXBpL2V2YWx1YXRpb25zP3BsYXllcklkPSR7cGxheWVySWR9JnN0YXR1cz0ke3N0YXR1c31gKVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBkYXRhIGZvciBzdGF0dXM6ICR7c3RhdHVzfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgLy8gTG9nIHRoZSByZXNwb25zZXMgdG8gY2hlY2sgdGhlaXIgc3RydWN0dXJlXG4gIGNvbnNvbGUubG9nKCdSZXNwb25zZXM6JywgcmVzcG9uc2VzKTtcblxuICBjb25zdCBldmFsdWF0aW9ucyA9IHJlc3BvbnNlcy5yZWR1Y2UoKGFjYzogUmVjb3JkPHN0cmluZywgRXZhbHVhdGlvbltdPiwgY3VycjogRXZhbHVhdGlvbltdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzID0gWydSZXF1ZXN0ZWQnLCAnQWNjZXB0ZWQnLCAnQ29tcGxldGVkJywgJ0RlY2xpbmVkJ11baW5kZXhdO1xuICAgIGFjY1tzdGF0dXNdID0gY3VycjsgLy8gR3JvdXAgZXZhbHVhdGlvbnMgYnkgc3RhdHVzXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuXG4gIC8vIExvZyB0aGUgZmluYWwgZXZhbHVhdGlvbnMgc3RydWN0dXJlXG4gIGNvbnNvbGUubG9nKCdFdmFsdWF0aW9uczonLCBldmFsdWF0aW9ucyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9wczogeyBldmFsdWF0aW9ucyB9LFxuICB9O1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFRhYnM7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJFdmFsdWF0aW9uc1RhYmxlIiwiRGFzaGJvYXJkVGFicyIsImV2YWx1YXRpb25zIiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwidGFicyIsImlkIiwibGFiZWwiLCJkaXYiLCJjbGFzc05hbWUiLCJtYXAiLCJ0YWIiLCJidXR0b24iLCJvbkNsaWNrIiwiZGF0YSIsImdldFNlcnZlclNpZGVQcm9wcyIsImNvbnRleHQiLCJwbGF5ZXJJZCIsInF1ZXJ5IiwicmVzcG9uc2VzIiwiUHJvbWlzZSIsImFsbCIsInN0YXR1cyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwiRXJyb3IiLCJqc29uIiwiY29uc29sZSIsImxvZyIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJpbmRleCIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/DashboardTabs.tsx\n"));

/***/ })

});