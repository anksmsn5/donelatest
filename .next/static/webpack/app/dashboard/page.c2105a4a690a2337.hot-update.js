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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"c0ce436240b8\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzUyODkiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJjMGNlNDM2MjQwYjhcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/components/DashboardTabs.tsx":
/*!******************************************!*\
  !*** ./app/components/DashboardTabs.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getServerSideProps: function() { return /* binding */ getServerSideProps; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _EvaluationsTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EvaluationsTable */ \"(app-pages-browser)/./app/components/EvaluationsTable.tsx\");\n// components/Tabs.tsx\n\nvar _s = $RefreshSig$();\n\n\nconst DashboardTabs = (param)=>{\n    let { evaluations } = param;\n    _s();\n    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const tabs = [\n        {\n            id: \"Requested\",\n            label: \"Requested\"\n        },\n        {\n            id: \"Accepted\",\n            label: \"Accepted\"\n        },\n        {\n            id: \"Completed\",\n            label: \"Completed\"\n        },\n        {\n            id: \"Declined\",\n            label: \"Declined\"\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col mt-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center items-center space-x-4 border-b pb-2\",\n                children: tabs.map((tab)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"p-2 font-semibold \".concat(activeTab === tab.id ? \"border-b-2 border-blue-500\" : \"\"),\n                        onClick: ()=>setActiveTab(tab.id),\n                        children: tab.label\n                    }, tab.id, false, {\n                        fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_EvaluationsTable__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    data: evaluations[activeTab] || []\n                }, void 0, false, {\n                    fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ankursrivastava/Desktop/d1notes/app/components/DashboardTabs.tsx\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DashboardTabs, \"Cm1EyDBcYE9W+K/dlcvCQ31OjkQ=\");\n_c = DashboardTabs;\nasync function getServerSideProps(context) {\n    const { playerId } = context.query; // Assuming you pass playerId as a query parameter\n    const responses = await Promise.all([\n        \"Requested\",\n        \"Accepted\",\n        \"Completed\",\n        \"Declined\"\n    ].map((status)=>fetch(\"/api/evaluations?playerId=\".concat(playerId, \"&status=\").concat(status)).then((res)=>{\n            if (!res.ok) {\n                throw new Error(\"Failed to fetch data for status: \".concat(status));\n            }\n            return res.json();\n        })));\n    // Log the responses to check their structure\n    console.log(\"Responses:\", responses);\n    const evaluations = responses.reduce((acc, curr, index)=>{\n        const status = [\n            \"Requested\",\n            \"Accepted\",\n            \"Completed\",\n            \"Declined\"\n        ][index];\n        acc[status] = curr; // Group evaluations by status\n        return acc;\n    }, {});\n    // Log the final evaluations structure\n    console.log(\"Evaluations:\", evaluations);\n    return {\n        props: {\n            evaluations\n        }\n    };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (DashboardTabs);\nvar _c;\n$RefreshReg$(_c, \"DashboardTabs\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL0Rhc2hib2FyZFRhYnMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0JBQXNCOzs7QUFDVztBQUNpQjtBQWtCbEQsTUFBTUUsZ0JBQThDO1FBQUMsRUFBRUMsV0FBVyxFQUFFOztJQUNsRSxNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR0wsK0NBQVFBO0lBRTFDLE1BQU1NLE9BQU87UUFDWDtZQUFFQyxJQUFJO1lBQWFDLE9BQU87UUFBWTtRQUN0QztZQUFFRCxJQUFJO1lBQVlDLE9BQU87UUFBVztRQUNwQztZQUFFRCxJQUFJO1lBQWFDLE9BQU87UUFBWTtRQUN0QztZQUFFRCxJQUFJO1lBQVlDLE9BQU87UUFBVztLQUNyQztJQUVELHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ1pKLEtBQUtLLEdBQUcsQ0FBQ0MsQ0FBQUEsb0JBQ1IsOERBQUNDO3dCQUVDSCxXQUFXLHFCQUE4RSxPQUF6RE4sY0FBY1EsSUFBSUwsRUFBRSxHQUFHLCtCQUErQjt3QkFDdEZPLFNBQVMsSUFBTVQsYUFBYU8sSUFBSUwsRUFBRTtrQ0FFakNLLElBQUlKLEtBQUs7dUJBSkxJLElBQUlMLEVBQUU7Ozs7Ozs7Ozs7MEJBUWpCLDhEQUFDRTtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ1QseURBQWdCQTtvQkFBQ2MsTUFBTVosV0FBVyxDQUFDQyxVQUFVLElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJNUQ7R0E1Qk1GO0tBQUFBO0FBNkJDLGVBQWVjLG1CQUFtQkMsT0FBWTtJQUNuRCxNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHRCxRQUFRRSxLQUFLLEVBQUUsa0RBQWtEO0lBRXRGLE1BQU1DLFlBQVksTUFBTUMsUUFBUUMsR0FBRyxDQUNqQztRQUFDO1FBQWE7UUFBWTtRQUFhO0tBQVcsQ0FBQ1gsR0FBRyxDQUFDWSxDQUFBQSxTQUNyREMsTUFBTSw2QkFBZ0RELE9BQW5CTCxVQUFTLFlBQWlCLE9BQVBLLFNBQ25ERSxJQUFJLENBQUNDLENBQUFBO1lBQ0osSUFBSSxDQUFDQSxJQUFJQyxFQUFFLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJQyxNQUFNLG9DQUEyQyxPQUFQTDtZQUN0RDtZQUNBLE9BQU9HLElBQUlHLElBQUk7UUFDakI7SUFJTiw2Q0FBNkM7SUFDN0NDLFFBQVFDLEdBQUcsQ0FBQyxjQUFjWDtJQUUxQixNQUFNakIsY0FBY2lCLFVBQVVZLE1BQU0sQ0FBQyxDQUFDQyxLQUFtQ0MsTUFBb0JDO1FBQzNGLE1BQU1aLFNBQVM7WUFBQztZQUFhO1lBQVk7WUFBYTtTQUFXLENBQUNZLE1BQU07UUFDeEVGLEdBQUcsQ0FBQ1YsT0FBTyxHQUFHVyxNQUFNLDhCQUE4QjtRQUNsRCxPQUFPRDtJQUNULEdBQUcsQ0FBQztJQUVKLHNDQUFzQztJQUN0Q0gsUUFBUUMsR0FBRyxDQUFDLGdCQUFnQjVCO0lBRTVCLE9BQU87UUFDTGlDLE9BQU87WUFBRWpDO1FBQVk7SUFDdkI7QUFDRjtBQUdBLCtEQUFlRCxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL0Rhc2hib2FyZFRhYnMudHN4PzRjNWQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50cy9UYWJzLnRzeFxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXZhbHVhdGlvbnNUYWJsZSBmcm9tICcuL0V2YWx1YXRpb25zVGFibGUnO1xuXG5pbnRlcmZhY2UgRXZhbHVhdGlvbiB7XG4gIGlkOiBudW1iZXI7XG4gIHJldmlld190aXRsZTogc3RyaW5nO1xuICBwcmltYXJ5X3ZpZGVvX2xpbms6IHN0cmluZztcbiAgdmlkZW9fbGlua190d28/OiBzdHJpbmc7XG4gIHZpZGVvX2xpbmtfdGhyZWU/OiBzdHJpbmc7XG4gIHZpZGVvX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBldmFsdWF0aW9uX3N0YXR1czogc3RyaW5nO1xuICBwYXltZW50X3N0YXR1czogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBEYXNoYm9hcmRUYWJzUHJvcHMge1xuICBldmFsdWF0aW9uczogUmVjb3JkPHN0cmluZywgRXZhbHVhdGlvbltdPjsgLy8gR3JvdXBlZCBieSBzdGF0dXNcbn1cblxuY29uc3QgRGFzaGJvYXJkVGFiczogUmVhY3QuRkM8RGFzaGJvYXJkVGFic1Byb3BzPiA9ICh7IGV2YWx1YXRpb25zIH0pID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPHN0cmluZz4oKTtcblxuICBjb25zdCB0YWJzID0gW1xuICAgIHsgaWQ6ICdSZXF1ZXN0ZWQnLCBsYWJlbDogJ1JlcXVlc3RlZCcgfSxcbiAgICB7IGlkOiAnQWNjZXB0ZWQnLCBsYWJlbDogJ0FjY2VwdGVkJyB9LFxuICAgIHsgaWQ6ICdDb21wbGV0ZWQnLCBsYWJlbDogJ0NvbXBsZXRlZCcgfSxcbiAgICB7IGlkOiAnRGVjbGluZWQnLCBsYWJlbDogJ0RlY2xpbmVkJyB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG10LTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgc3BhY2UteC00IGJvcmRlci1iIHBiLTJcIj5cbiAgICAgICAge3RhYnMubWFwKHRhYiA9PiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAga2V5PXt0YWIuaWR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgZm9udC1zZW1pYm9sZCAke2FjdGl2ZVRhYiA9PT0gdGFiLmlkID8gJ2JvcmRlci1iLTIgYm9yZGVyLWJsdWUtNTAwJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIodGFiLmlkKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFiLmxhYmVsfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTRcIj5cbiAgICAgICAgPEV2YWx1YXRpb25zVGFibGUgZGF0YT17ZXZhbHVhdGlvbnNbYWN0aXZlVGFiXSB8fCBbXX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoY29udGV4dDogYW55KSB7XG4gIGNvbnN0IHsgcGxheWVySWQgfSA9IGNvbnRleHQucXVlcnk7IC8vIEFzc3VtaW5nIHlvdSBwYXNzIHBsYXllcklkIGFzIGEgcXVlcnkgcGFyYW1ldGVyXG5cbiAgY29uc3QgcmVzcG9uc2VzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgWydSZXF1ZXN0ZWQnLCAnQWNjZXB0ZWQnLCAnQ29tcGxldGVkJywgJ0RlY2xpbmVkJ10ubWFwKHN0YXR1cyA9PlxuICAgICAgZmV0Y2goYC9hcGkvZXZhbHVhdGlvbnM/cGxheWVySWQ9JHtwbGF5ZXJJZH0mc3RhdHVzPSR7c3RhdHVzfWApXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGRhdGEgZm9yIHN0YXR1czogJHtzdGF0dXN9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9KVxuICAgIClcbiAgKTtcblxuICAvLyBMb2cgdGhlIHJlc3BvbnNlcyB0byBjaGVjayB0aGVpciBzdHJ1Y3R1cmVcbiAgY29uc29sZS5sb2coJ1Jlc3BvbnNlczonLCByZXNwb25zZXMpO1xuXG4gIGNvbnN0IGV2YWx1YXRpb25zID0gcmVzcG9uc2VzLnJlZHVjZSgoYWNjOiBSZWNvcmQ8c3RyaW5nLCBFdmFsdWF0aW9uW10+LCBjdXJyOiBFdmFsdWF0aW9uW10sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSBbJ1JlcXVlc3RlZCcsICdBY2NlcHRlZCcsICdDb21wbGV0ZWQnLCAnRGVjbGluZWQnXVtpbmRleF07XG4gICAgYWNjW3N0YXR1c10gPSBjdXJyOyAvLyBHcm91cCBldmFsdWF0aW9ucyBieSBzdGF0dXNcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG5cbiAgLy8gTG9nIHRoZSBmaW5hbCBldmFsdWF0aW9ucyBzdHJ1Y3R1cmVcbiAgY29uc29sZS5sb2coJ0V2YWx1YXRpb25zOicsIGV2YWx1YXRpb25zKTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7IGV2YWx1YXRpb25zIH0sXG4gIH07XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkVGFicztcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkV2YWx1YXRpb25zVGFibGUiLCJEYXNoYm9hcmRUYWJzIiwiZXZhbHVhdGlvbnMiLCJhY3RpdmVUYWIiLCJzZXRBY3RpdmVUYWIiLCJ0YWJzIiwiaWQiLCJsYWJlbCIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsInRhYiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJkYXRhIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsInBsYXllcklkIiwicXVlcnkiLCJyZXNwb25zZXMiLCJQcm9taXNlIiwiYWxsIiwic3RhdHVzIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwib2siLCJFcnJvciIsImpzb24iLCJjb25zb2xlIiwibG9nIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImluZGV4IiwicHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/DashboardTabs.tsx\n"));

/***/ })

});