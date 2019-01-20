import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
describe('HeroDetail Component', () => {
    let mockActivatedRoute, mockHeroService, mockLocation;
    let fixture: ComponentFixture<HeroDetailComponent>;
    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: {paramMap: {get: () => '3'}}
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

     TestBed.configureTestingModule({
         imports: [FormsModule],
         declarations: [HeroDetailComponent],
         providers: [
             {provide: ActivatedRoute, useValue: mockActivatedRoute},
             {provide: HeroService, useValue: mockHeroService},
             {provide: Location, useValue: mockLocation},

         ]

     });
     fixture = TestBed.createComponent(HeroDetailComponent);
     mockHeroService.getHero.and.returnValue(of({id: '3', name: 'superDude', strength: 3}));
    });
    it('should render the hero name in an h2 tag', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');

    });
    it('should call updateHero when save is called', (done) => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();
        fixture.componentInstance.save();
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();
        }, 300);
    });

    // control Asynchronous code and able to control synchronously
    // fakeAsync can be used with setTimeout and promise

    it('should call updateHero when save is called- fakeAsynch - Correct Way', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();
        fixture.componentInstance.save();
        // tick(250); // tick forward to clock 250 ms
        flush(); // telling zone.js --
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));


    // async is only capable of using with prmoises
    // When using promises
    // it('should call updateHero when save is called- fakeAsynch - Correct Way', async(() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();
    //     fixture.componentInstance.save();

    //     fixture.whenStable().then(() => {

    //         expect(mockHeroService.updateHero).toHaveBeenCalled();

    //     });
    // }));


});
