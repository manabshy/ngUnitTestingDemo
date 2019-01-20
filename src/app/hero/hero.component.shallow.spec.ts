import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('Hero component shallow test', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                declarations: [HeroComponent],
                schemas: [NO_ERRORS_SCHEMA] // Ignore unknown attributes or elements
                // It won't warn us typos,spelling mistakes
                // Only use this setting when absolutely necessary
            }
        );
        fixture = TestBed.createComponent(HeroComponent);
    });
    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id: 1, name: 'SuperDude', strength: 3};
        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });
    it('should render the hero name in the anchor tag', () => {
        fixture.componentInstance.hero = {id: 1, name: 'SuperDude', strength: 3};
        fixture.detectChanges(); // Tell Angular to update bindings

        // debugElement is a wrapper around dom node. It also exposes other properties - directive
        const deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('SuperDude');
        // nativeElement is a wrapper around component
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
});
