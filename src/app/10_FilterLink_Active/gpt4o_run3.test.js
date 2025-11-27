import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkActiveComponent } from './filter-link-active.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkActiveComponent', () => {
  let component: FilterLinkActiveComponent;
  let fixture: ComponentFixture<FilterLinkActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLinkActiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with "Active" text', () => {
    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-active"]')
    );
    expect(linkElement.nativeElement.textContent.trim()).toBe('Active');
  });

  it('should apply selected class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-active"]')
    );
    expect(linkElement.nativeElement.classList).toContain('selected');
  });

  it('should not apply selected class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-active"]')
    );
    expect(linkElement.nativeElement.classList).not.toContain('selected');
  });

  it('should call selectFilter and log when link is clicked', () => {
    const spy = jest.spyOn(component, 'selectFilter');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-active"]')
    );
    linkElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Active filter selected');

    consoleSpy.mockRestore();
  });

  it('should prevent default action on click', () => {
    const linkElement = fixture.debugElement.query(
      By.css('[data-testid="filter-link-active"]')
    );

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    linkElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
});