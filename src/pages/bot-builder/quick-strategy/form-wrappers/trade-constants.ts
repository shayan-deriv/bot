import { localize } from '@deriv-com/translations';
import { STRATEGIES } from '../config';

export enum QsSteps {
    StrategySelect,
    StrategyVerified,
    StrategyCompleted,
}

type TTradeTypesItemsIndex = {
    [key: string]: number;
};

export const TRADE_TYPE_INDEX: TTradeTypesItemsIndex = Object.freeze({
    // ALL: 0,
    // ACCUMULATORS: 1,
    OPTIONS: 0,
    // MULTIPLIERS: 3,
});

// export const TRADE_TYPES = [localize('All'), localize('Accumulators'), localize('Options'), localize('Multipliers')];
export const TRADE_TYPES = [localize('Options')];

export type TTStrategyTradeAssociation = {
    name: string;
    display_name: string;
    id: number;
    parent: Array<string>;
};

export type TStrategyTradeAssociations = Array<TTStrategyTradeAssociation>;

export const STRATEGY_TRADE_ASSOCIATIONS: TStrategyTradeAssociations = [
    {
        name: 'MARTINGALE',
        display_name: STRATEGIES().MARTINGALE.label,
        id: 0,
        parent: [localize('Options'), localize('Multipliers'), localize('Accumulators')],
    },
    {
        name: 'D_ALEMBERT',
        display_name: STRATEGIES().D_ALEMBERT.label,
        id: 1,
        parent: [localize('Options'), localize('Multipliers'), localize('Accumulators')],
    },
    {
        name: 'REVERSE_MARTINGALE',
        display_name: STRATEGIES().REVERSE_MARTINGALE.label,
        id: 2,
        parent: [localize('Options'), localize('Multipliers'), localize('Accumulators')],
    },
    {
        name: 'REVERSE_D_ALEMBERT',
        display_name: STRATEGIES().REVERSE_D_ALEMBERT.label,
        id: 3,
        parent: [localize('Options'), localize('Multipliers'), localize('Accumulators')],
    },
    {
        name: 'OSCARS_GRIND',
        display_name: STRATEGIES().OSCARS_GRIND.label,
        id: 4,
        parent: [localize('Options')],
    },
    {
        name: 'STRATEGY_1_3_2_6',
        display_name: STRATEGIES().STRATEGY_1_3_2_6.label,
        id: 5,
        parent: [localize('Options'), localize('Multipliers')],
    },
];
