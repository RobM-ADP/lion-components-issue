declare var window: any;

import { LitElement } from '@lion/core';
import { ChoiceGroupMixin } from '@lion/choice-input';
import { FormGroupMixin } from '@lion/fieldset';

/**
 * A wrapper around multiple radios.
 *
 * @extends {LionFieldset}
 */
export class AdplRadioGroup extends ChoiceGroupMixin(FormGroupMixin(LitElement)) {
  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super['connectedCallback']();
    (this as any).setAttribute('role', 'radiogroup');
  }
}


window.customElements.define('adpl-radio-group', AdplRadioGroup as any);

