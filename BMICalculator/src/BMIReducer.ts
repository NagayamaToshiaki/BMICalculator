export type BMIState = {
    height: number,
    weight: number,
    idealWeight: number,
    bmiIndex: number,
    description?: Description,
};

type Description = "Underweight" | "Normal Range" | "Pre-obese" | "Obese class I" | "Obese class II" | "Obese class  III";

type BMIActionType = "setHeight" | "setWeight" | "clearAll";

type BMIAction = { type: BMIActionType } & ({
    type: "setHeight";
    height: number;
} | {
    type: "setWeight"
    weight: number
} | {
    type: "clearAll"
});

function idealWeight(height: number) {
    return height * height * 22.5;
}

function getBmiIndex(height: number, weight: number) {
    return weight / height / height;
}

function description(bmiIndex: number): Description {
    if (bmiIndex <= 18.5) {
        return "Underweight"
    }
    if (bmiIndex < 25) {
        return "Normal Range"
    }
    if (bmiIndex < 30) {
        return "Pre-obese"
    }
    if (bmiIndex < 35) {
        return "Obese class I"
    }
    if (bmiIndex < 40) {
        return "Obese class II"
    }
    return "Obese class  III"
}

function setState(height: number, weight: number): BMIState {
    const bmiIndex = getBmiIndex(height, weight);
    return {
        height,
        weight,
        idealWeight: idealWeight(height),
        bmiIndex,
        description: description(bmiIndex),
    }
}

export function reducer(state: BMIState, action: BMIAction): BMIState {
    switch (action.type) {
        case "setHeight": {
            return setState(action.height / 100, state.weight)
        }
        case "setWeight": {
            return setState(state.height, action.weight)
        }
        case "clearAll": {
            return {
                height: 0,
                weight: 0,
                idealWeight: 0,
                bmiIndex: 0,
            }
        }
    }
} 
