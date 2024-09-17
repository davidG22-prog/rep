import { WebPlugin } from '@capacitor/core';
import type { PrivacyScreenPlugin } from './definitions';
export declare class PrivacyScreenWeb extends WebPlugin implements PrivacyScreenPlugin {
    enable(): Promise<void>;
    disable(): Promise<void>;
}
