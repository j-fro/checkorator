import { is } from './is';
import { check } from './check';

@check()
class TestThing {
    constructor(
        @is(() => true)
        _: string,
        @is(() => true)
        __: number
    ) {}
}

const _ = new TestThing('hi', 5);
if (_) {
}
