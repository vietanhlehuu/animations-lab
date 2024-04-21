import type { MetaFunction } from '@remix-run/node';

import ScrollTextStep1 from '~/components/scroll-text/ScrollTextStep1';
import ScrollTextStep2 from '~/components/scroll-text/ScrollTextStep2';
import ScrollTextStep3 from '~/components/scroll-text/ScrollTextStep3';
import ScrollTextStep4 from '~/components/scroll-text/ScrollTextStep4';
import ScrollIndicator from '~/components/shared/ScrollIndicator';

export const meta: MetaFunction = () => {
  return [{ title: 'Scroll Text' }];
};

export default function App() {
  return (
    <div>
      <ScrollIndicator text="Step 1 - Basic" />
      <ScrollTextStep1 />
      <ScrollIndicator text="Step 2 - Add scroll" />
      <ScrollTextStep2 />
      <ScrollIndicator text="Step 3 - Handle sticky" />
      <ScrollTextStep3 />
      <ScrollIndicator text="Step 4 - Split text" />
      <ScrollTextStep4 />
      <ScrollIndicator direction="up" />
    </div>
  );
}
