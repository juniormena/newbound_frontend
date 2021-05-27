import { Fragment } from "react";

function Step({ step, index, steps }) {
  return (
    <Fragment>
      <div className="step" data-target={`${step.target}`}>
        <button className="step-trigger">
          <span className="bs-stepper-circle">
            {step.completed ? "✔" : index + 1}
          </span>
          <span className="bs-stepper-label">{step.name}</span>
        </button>
      </div>
      {index + 1 === steps.length ? <></> : <div className="line" />}
    </Fragment>
  );
}

export default Step;