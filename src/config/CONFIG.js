export const SELECTOR_SHAPE_COUNT_TYPE = "selectorShapeCountType";
export const SELECTOR_GRAVITY_TYPE = "selectorGravityType";
export const SELECTOR_SHAPE_COUNT_VALUE_DEFAULT = 2;
export const SELECTOR_GRAVITY_VALUE_DEFAULT = 50;

export const PIXI_APPLICATION_OPTIONS = {
    antialias: true,
    backgroundColor: 0x202020
};

export const SELECTOR_SHAPE_COUNT_DATA = {
    id: 1,
    type: SELECTOR_SHAPE_COUNT_TYPE,
    title: "Фигур за секунду",
    value: SELECTOR_SHAPE_COUNT_VALUE_DEFAULT,
    valueMin: 1,
    valueMax: 10,
    valueStep: 1
};

export const SELECTOR_GRAVITY_DATA = {
    id: 2,
    type: SELECTOR_GRAVITY_TYPE,
    title: "Значение гравитации",
    value: SELECTOR_GRAVITY_VALUE_DEFAULT,
    valueMin: 10,
    valueMax: 100,
    valueStep: 1
};