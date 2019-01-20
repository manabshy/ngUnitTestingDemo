import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
    selector: '[routerLink]',
    host: {'(click)' : 'onClick()'}
})
// RouterDirectiveStub to listen to routerLink directive
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('Heroes Component deep test', () => {

let fixture: ComponentFixture<HeroesComponent>;
let mockHeroService;
let HEROES;


    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'SpiderDude1', strength: 8},
            {id: 3, name: 'SpiderDude2', strength: 8},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'deleteHero', 'addHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                {provide: HeroService, useValue: mockHeroService
                }

            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

    });

    it('should be true', () => {
        expect(true).toBe(true);
    });

    it(`should call heroService.deleteHero when the Hero
     Component's delete method is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});

        // heroComponents[0].componentInstance.delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });
    it('should add a hero to the list of heroes when add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = 'Mr Ice';
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        console.log('inputElement', inputElement);

        /***you could do this */
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
        console.log('addButton', addButton);
        inputElement.value = name;
        addButton.click();
        /*** or you could do this */
        // const addButton1 = fixture.debugElement.queryAll(By.css('button'))[0];
        // console.log('addButton1', addButton1);
        // inputElement.value = name;
        // addButton1.triggerEventHandler('click',null);

        // addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        console.log('heroText', heroText);
        expect(heroText).toContain(name);

    });
    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});

