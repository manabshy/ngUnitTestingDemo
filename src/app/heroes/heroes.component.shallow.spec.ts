import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('Heroes Component Shallow test', () => {

let fixture: ComponentFixture<HeroesComponent>;
let mockHeroService;
let HEROES;

@Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();

  }

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'SpiderDude1', strength: 8},
            {id: 3, name: 'SpiderDude2', strength: 8},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'deleteHero', 'addHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, MockHeroComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService
                }

            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });
    it('should do nothing', () => {
        expect(true).toBe(true);
    });
    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        // in order for ngOnInit to fire - we actually have to run change detection
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });
    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);

    });

});
