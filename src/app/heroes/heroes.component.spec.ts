
import {HeroesComponent  } from './heroes.component';
import { of } from 'rxjs';
describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;
    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'Spider', strength: 8},
            {id: 2, name: 'Spider1', strength: 8},
            {id: 3, name: 'Spider2', strength: 8},
            {id: 4, name: 'Spider2', strength: 8},

        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);

    });

    describe('delete', () => {
        it('should remove the indicated hero from the hero list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toEqual(3);
        });
        it('should called deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalled();
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);

        });
    });
});
