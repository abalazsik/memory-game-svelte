import { Generator } from './cards';
import { get, writable } from 'svelte/store';
import { recordStore } from './recordStore';

enum State {
    AllUnselected, FirstSelected, SecondSelected
}

function createStateMachineStore() {
    const cardData = Generator.generate();

    const { subscribe, set, update } = writable(
        {
            state: State.AllUnselected,
            firstIdx: -1,
            secondIdx: -1,
            cardData: cardData,
            isEnded: false,
            isClickable: true,
            steps: 0
        });
    return {
        subscribe,
        transition: (data) => {
            update(old => {

                switch (old.state) {
                    case State.AllUnselected: {
                        old.firstIdx = data.idx;
                        old.state = State.FirstSelected;
                        old.isClickable = true;
                    }
                        break;
                    case State.FirstSelected: {
                        old.secondIdx = data.idx;
                        old.state = State.SecondSelected;
                        old.isClickable = false;

                        setTimeout(() => {
                            update(old => {
                                const first = old.cardData.find(data => data.idx === old.firstIdx);
                                const second = old.cardData.find(data => data.idx === old.secondIdx);
                                
                                if (!first) { throw "invalid firstIdx" }
                                if (!second) { throw "invalid secondIdx"; }

                                if (first.equals(second)) {
                                    old.cardData = old.cardData.filter(data => data.idx !== old.firstIdx && data.idx !== old.secondIdx);
                                } else {
                                    first.visible = false;
                                    second.visible = false;
                                }
                                old.state = State.AllUnselected;
                                old.isEnded = old.cardData.length === 0;
                                old.steps = old.steps + 1;
                                
                                if (!old.isEnded) {
                                    old.isClickable = true;
                                } else if (get(recordStore) === undefined || get(recordStore) > old.steps) {
                                    recordStore.set(old.steps);
                                }
                                
                                return old;
                            });
                        }, 2000);
                    } break;
                }
                return old;
            });
        },
        reset: () => {
            const cardData = Generator.generate();
            set({
                state: State.AllUnselected,
                firstIdx: -1,
                secondIdx: -1,
                cardData: cardData,
                isEnded: false,
                isClickable: true,
                steps: 0
            });
        }
    }
}

export const stateMachine = createStateMachineStore();
