import { Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import useStyles from '../Utils/Style'

export default function CheckoutWizard({ activeStep = 0 }) {
    const clasess = useStyles()
    return (
        <Stepper activeStep={activeStep} alternativeLabel className={clasess.backgroundTransparent}>
            {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step) => (
                <Step key={step}>
                    <StepLabel>
                        {step}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}
